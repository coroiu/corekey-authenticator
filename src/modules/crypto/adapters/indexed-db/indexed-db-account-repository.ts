import { update } from 'idb-keyval';
import * as uuid from 'uuid';

import { Account } from '../../core/account';
import { AccountRepository } from '../../core/ports/account.repository';
import { createSchema, mapAccountToDb } from './functions';
import { DbSchema } from './schema';

const dbKey = "accounts";

export class IndexedDbAccountRepository implements AccountRepository {
  constructor() {}

  getAll(): Promise<Account[]> {
    throw new Error("Method not implemented.");
  }

  generateId(): Promise<string> {
    return Promise.resolve(uuid.v4());
  }

  save(account: Account): Promise<void> {
    return update(dbKey, (schema?: DbSchema) => {
      if (schema === undefined) {
        schema = createSchema();
      }

      schema.accounts[account.id] = mapAccountToDb(account);
      return schema;
    });
  }
}
