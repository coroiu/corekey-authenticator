import { get, update } from 'idb-keyval';
import * as uuid from 'uuid';

import { Account } from '../../core/account';
import { AccountRepository } from '../../core/ports/account.repository';
import { createSchema, mapAccountFromDb, mapAccountToDb } from './functions';
import { DbSchema } from './schema';

const dbKey = "accounts";

export class IndexedDbAccountRepository implements AccountRepository {
  constructor() {}

  async getAll(): Promise<Account[]> {
    const schema: DbSchema | undefined = await get(dbKey);
    if (schema === undefined) {
      return [];
    }

    if (schema.version !== 0) {
      throw new Error("Unkown schema version.");
    }

    return Object.values(schema.accounts).map(mapAccountFromDb);
  }

  async get(accountId: string): Promise<Account | undefined> {
    const schema: DbSchema | undefined = await get(dbKey);
    if (schema === undefined) {
      return undefined;
    }

    if (schema.version !== 0) {
      throw new Error("Unkown schema version.");
    }

    const dto = schema.accounts[accountId];
    if (dto === undefined) {
      return undefined;
    }

    return mapAccountFromDb(dto);
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
