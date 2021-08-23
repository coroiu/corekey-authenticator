import { useState } from 'react';

import { Account } from '../../modules/crypto/core/ports/account.service/account.model';
import { useServiceWorker } from '../providers/ServiceWorkerProvider';

export interface UseAccountReturnType<TAccount> {
  account: TAccount;
  isDeleted: boolean;
}

export function useAccount(account: Account): UseAccountReturnType<Account>;
export function useAccount(
  accountId: string
): UseAccountReturnType<Account | null>;
export function useAccount(
  account_or_accountId: Account | string
): UseAccountReturnType<Account | null> {
  const serviceWorker = useServiceWorker();
  const [account, setAccount] = useState<Account | null>(
    typeof account_or_accountId === "object" ? account_or_accountId : null
  );
  const accountId =
    typeof account_or_accountId === "object"
      ? account_or_accountId.id
      : account_or_accountId;

  return { account, isDeleted: false };
}
