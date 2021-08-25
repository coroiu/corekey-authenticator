import { useEffect, useState } from 'react';

import { Account } from '../../modules/crypto/core/ports/account.service/account.model';
import { isNewAccountCreatedEvent } from '../../modules/crypto/core/ports/account.service/events/new-account-created.event';
import { useEvents, useServiceWorker } from '../providers/ServiceWorkerProvider';

export function useAllAccounts(): { accounts: Account[] } {
  const serviceWorker = useServiceWorker();
  const { event } = useEvents();
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    serviceWorker.crypto.accountService.getAllAccounts().then((a) => {
      setAccounts(a);
    });
  }, [serviceWorker, setAccounts]);

  useEffect(() => {
    if (event === undefined) return;

    if (isNewAccountCreatedEvent(event)) {
      setAccounts((a) => [...a, event.account]);
    }
  }, [event, setAccounts]);

  return { accounts };
}
