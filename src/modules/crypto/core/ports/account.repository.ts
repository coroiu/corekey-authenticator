import { Account } from '../account';

export interface AccountRepository {
  getAll(): Promise<Account[]>;
  get(accountId: string): Promise<Account | undefined>;
  generateId(): Promise<string>;
  save(account: Account): Promise<void>;
}
