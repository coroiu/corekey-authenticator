import { useEffect, useState } from 'react';

import { Account } from '../../modules/crypto/core/ports/account.service/account.model';
import { useServiceWorker } from '../providers/ServiceWorkerProvider';
import AccountCard from './AccountCard';

export default function AccountList() {
  const serviceWorker = useServiceWorker();
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    serviceWorker.crypto.accountService.getAllAccounts().then(setAccounts);
  }, [serviceWorker, setAccounts]);

  return (
    <>
      {accounts.map((account) => (
        <AccountCard account={account} />
      ))}
    </>
  );
}
