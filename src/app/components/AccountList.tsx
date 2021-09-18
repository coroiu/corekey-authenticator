import { useEffect } from 'react';

import { isNewAccountCreatedEvent } from '../../modules/crypto/core/ports/account.service/events/new-account-created.event';
import { useAllAccounts } from '../hooks/UseAllAccountsHook';
import { useEvents } from '../providers/ServiceWorkerProvider';
import AccountCard from './AccountCard';

export default function AccountList() {
  const { accounts } = useAllAccounts();
  const { event } = useEvents();

  const cards = accounts.map((account) => {
    const isNew =
      event &&
      isNewAccountCreatedEvent(event) &&
      account.id === event.account.id;

    return <AccountCard account={account} isNew={isNew} />;
  });

  return <>{cards}</>;
}
