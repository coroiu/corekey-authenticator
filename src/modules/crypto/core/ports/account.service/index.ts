import { AccountRepository } from "../account.repository";
import { Account } from "./account.model";

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
}
