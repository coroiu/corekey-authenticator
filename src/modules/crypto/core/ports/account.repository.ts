import { Account } from "../account";

export interface AccountRepository {
  getAll(): Promise<Account[]>;
  generateId(): Promise<string>;
  save(account: Account): Promise<void>;
}
