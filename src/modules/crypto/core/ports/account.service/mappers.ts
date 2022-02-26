import { Account as CoreAccount } from '../../account';
import { Key, PlainHKey, PlainTKey, SealedHKey, SealedTKey } from '../../key';
import { Account } from './account.model';

export function mapAccount(account: CoreAccount): Account {
  return {
    id: account.id,
    issuer: account.issuer,
    name: account.name,
    key: {
      type: mapKeyType(account.key),
      length: account.key.length,
      method: account.key.method,
    },
  } as Account;
}

function mapKeyType(key: Key): Account["key"]["type"] {
  if (key instanceof PlainHKey || key instanceof SealedHKey) {
    return "hkey";
  } else if (key instanceof PlainTKey || key instanceof SealedTKey) {
    return "tkey";
  } else {
    throw new Error(`Cannot map unknown key type ${key}`);
  }
}
