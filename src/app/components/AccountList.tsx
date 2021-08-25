import { useEffect, useState } from 'react';

import { useAllAccounts } from '../hooks/UseAllAccountsHook';
import AccountCard from './AccountCard';

export default function AccountList() {
  const { accounts } = useAllAccounts();

  return (
    <>
      {accounts.map((account) => (
        <AccountCard account={account} />
      ))}
    </>
  );
}
