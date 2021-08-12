import { useEffect, useState } from 'react';

import { Account } from '../../modules/crypto/core/ports/account.service/account.model';
import { useServiceWorker } from '../providers/ServiceWorkerProvider';

export default function AccountList() {
  const serviceWorker = useServiceWorker();
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    serviceWorker.crypto.accountService.getAllAccounts().then(setAccounts);
  }, [serviceWorker, setAccounts]);

  return (
    <div>
      <ul>
        {accounts.map((account) => (
          <li>{account.name}</li>
        ))}
      </ul>
    </div>
  );
}
