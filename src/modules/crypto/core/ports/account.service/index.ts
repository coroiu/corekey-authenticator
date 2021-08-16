import { Account as CoreAccount } from '../../account';
import { HKey as CoreHKey, Key as CoreKey, TKey as CoreTKey } from '../../key';
import { AccountRepository } from '../account.repository';
import { Account } from './account.model';
import { NewAccount } from './new-account.model';

export class AccountService {
  constructor(private accounts: AccountRepository) {}

  async getAllAccounts(): Promise<Account[]> {
    const allAccounts = await this.accounts.getAll();
    return allAccounts.map(
      (a) =>
        ({
          id: a.id,
          issuer: a.issuer,
          name: a.name,
        } as Account)
    );
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
}
