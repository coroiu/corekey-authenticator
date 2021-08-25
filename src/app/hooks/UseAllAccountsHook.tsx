import { useEffect, useState } from 'react';

import { Account } from '../../modules/crypto/core/ports/account.service/account.model';
import { isAccountDeletedEvent } from '../../modules/crypto/core/ports/account.service/events/account-deleted.event';
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
      return setAccounts((accs) => [...accs, event.account]);
    }

    if (isAccountDeletedEvent(event)) {
      console.log("isAccountDeletedEvent", event);
      return setAccounts((accs) =>
        accs.filter((a) => a.id !== event.accountId)
      );
    }
  }, [event, setAccounts]);

  return { accounts };
}
