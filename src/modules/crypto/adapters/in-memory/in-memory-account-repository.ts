import * as uuid from 'uuid';

import { Account } from '../../core/account';
import { AccountRepository } from '../../core/ports/account.repository';

export class InMemoryAccountRepository implements AccountRepository {
  private accounts = new Map<string, Account>();

  getAll(): Promise<Account[]> {
    return Promise.resolve(Array.from(this.accounts.values()));
  }

  get(accountId: string): Promise<Account | undefined> {
    return Promise.resolve(this.accounts.get(accountId));
  }

  generateId(): Promise<string> {
    return Promise.resolve(uuid.v4());
  }

  save(account: Account): Promise<void> {
    this.accounts.set(account.id, account);
    return Promise.resolve();
  }
}
