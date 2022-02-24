import { Event } from '../../../../../common/event';
import { EventEmitter } from '../../../../../common/event-emitter';
import { Account as CoreAccount } from '../../account';
import { AccountDeleted } from '../../events/account/account-deleted';
import { Key as CoreKey, PlainHKey as CoreHKey, PlainTKey as CoreTKey, PlainTKey } from '../../key';
import { base32ToHexStr, decodeUri } from '../../utils';
import { AccountRepository } from '../account.repository';
import { CryptoRepository } from '../crypto.repository';
import { AccountServiceEmitter } from './account-service-emitter';
import { Account } from './account.model';
import { Code } from './code.model';
import { mapAccount } from './mappers';
import { NewAccount, NewHKey, NewTKey } from './new-account.model';

export class AccountService {
  private emitter: AccountServiceEmitter;

  constructor(
    private accounts: AccountRepository,
    private crypto: CryptoRepository,
    emitter: EventEmitter<Event>
  ) {
    this.emitter = new AccountServiceEmitter(emitter);
  }

  async getAllAccounts(): Promise<Account[]> {
    const allAccounts = await this.accounts.getAll();
    return allAccounts.map(mapAccount);
  }

  async getAccountById(accountId: string): Promise<Account | undefined> {
    const account = await this.accounts.get(accountId);
    return account === undefined ? undefined : mapAccount(account);
  }

  async createNewAccount(newAccount: NewAccount): Promise<void> {
    const id = await this.accounts.generateId();

    // Expect secret in Base32
    const decodedSecret = base32ToHexStr(newAccount.key.secret);

    let key: CoreKey;
    if (newAccount.key.type === "hkey") {
      const { length = 6, method = "sha1", counter } = newAccount.key;
      key = new CoreHKey(decodedSecret, length, method, counter);
    } else {
      const { length = 6, method = "sha1" } = newAccount.key;
      key = new CoreTKey(decodedSecret, length, method);
    }

    const account = CoreAccount.create(
      id,
      newAccount.name,
      newAccount.issuer,
      key
    );
    await this.accounts.save(account);
    this.emitter.extractAndEmit(account);
  }

  async generateCodeForAccount(accountId: string): Promise<Code | undefined> {
    const account = await this.accounts.get(accountId);
    if (account === undefined) {
      return undefined;
    }

    const code = await this.crypto.generateCode(account.key);
    await this.accounts.save(account);
    this.emitter.extractAndEmit(account);
    return {
      expiresAt: code.expiresAt,
      value: code.value,
    };
  }

  async updateAccount(
    accountId: string,
    updates: Partial<Pick<Account, "name" | "issuer">>
  ): Promise<void> {
    const account = await this.accounts.get(accountId);
    if (account === undefined) {
      return undefined;
    }

    account.rename(
      updates.name ?? account.name,
      updates.issuer ?? account.issuer
    );

    await this.accounts.save(account);
    this.emitter.extractAndEmit(account);
  }

  async deleteAccount(accountId: string): Promise<void> {
    await this.accounts.delete(accountId);
    this.emitter.extractAndEmit(new AccountDeleted(accountId));
  }

  async decodeUri(uri: string): Promise<NewAccount | undefined> {
    const decoded = decodeUri(uri);

    if (decoded == undefined) {
      return undefined;
    }

    let key;
    if (decoded.key instanceof PlainTKey) {
      key = {
        type: "tkey",
        secret: decoded.key.secret,
        length: decoded.key.length,
        method: decoded.key.method,
      } as NewTKey;
    } else {
      key = {
        type: "hkey",
        secret: decoded.key.secret,
        length: decoded.key.length,
        method: decoded.key.method,
      } as NewHKey;
    }

    return {
      name: decoded.name,
      issuer: decoded.issuer,
      key,
    };
  }
}
