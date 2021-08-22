import { Account as CoreAccount } from '../../account';
import { HKey as CoreHKey, Key as CoreKey, TKey as CoreTKey } from '../../key';
import { AccountRepository } from '../account.repository';
import { CryptoRepository } from '../crypto.repository';
import { Account } from './account.model';
import { Code } from './code.model';
import { NewAccount } from './new-account.model';

export class AccountService {
  constructor(
    private accounts: AccountRepository,
    private crypto: CryptoRepository
  ) {}

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

    let key: CoreKey;
    if (newAccount.key.type === "hkey") {
      const { secret, length = 6, method = "sha1", counter } = newAccount.key;
      key = new CoreHKey(secret, length, method, counter);
    } else {
      const { secret, length = 6, method = "sha1" } = newAccount.key;
      key = new CoreTKey(secret, length, method);
    }

    const account = new CoreAccount(
      id,
      newAccount.name,
      newAccount.issuer,
      key
    );
    await this.accounts.save(account);
  }

  async generateCodeForAccount(accountId: string): Promise<Code | undefined> {
    const account = await this.accounts.get(accountId);
    if (account === undefined) {
      return undefined;
    }

    const code = this.crypto.generateCode(account.key);
    await this.accounts.save(account);
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

    account.issuer = updates.issuer ?? account.issuer;
    account.name = updates.name ?? account.name;

    await this.accounts.save(account);
  }

  async deleteAccount(accountId: string): Promise<void> {
    await this.accounts.delete(accountId);
  }
}

function mapAccount(account: CoreAccount): Account {
  return {
    id: account.id,
    issuer: account.issuer,
    name: account.name,
    key: {
      type: account.key instanceof CoreHKey ? "hkey" : "tkey",
      length: account.key.length,
      method: account.key.method,
    },
  } as Account;
}
