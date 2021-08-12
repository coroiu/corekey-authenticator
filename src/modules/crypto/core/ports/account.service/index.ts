import { Account as CoreAccount } from "../../account";
import { AccountRepository } from "../account.repository";
import { Account } from "./account.model";
import { NewAccount } from "./new-account.model";

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
    const account = new CoreAccount(
      id,
      newAccount.name,
      newAccount.issuer,
      newAccount.key
    );
    await this.accounts.save(account);
  }
}
