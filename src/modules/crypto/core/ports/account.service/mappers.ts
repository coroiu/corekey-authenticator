import { Account as CoreAccount } from '../../account';
import { HKey as CoreHKey } from '../../key';
import { Account } from './account.model';

export function mapAccount(account: CoreAccount): Account {
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
