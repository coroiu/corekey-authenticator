import { useEffect, useState } from 'react';

import { Account } from '../../modules/crypto/core/ports/account.service/account.model';
import { isAccountRenamedEvent } from '../../modules/crypto/core/ports/account.service/events/account-renamed.event';
import { isNewAccountCreatedEvent } from '../../modules/crypto/core/ports/account.service/events/new-account-created.event';
import { useEvents, useServiceWorker } from '../providers/ServiceWorkerProvider';

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
  const { event } = useEvents();
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [account, setAccount] = useState<Account | null>(
    typeof account_or_accountId === "object" ? account_or_accountId : null
  );
  const accountId =
    typeof account_or_accountId === "object"
      ? account_or_accountId.id
      : account_or_accountId;

  useEffect(() => {
    if (account !== null) return;

    serviceWorker.crypto.accountService
      .getAccountById(accountId)
      .then((account) => {
        if (account === undefined) {
          return setIsDeleted(true);
        }

        setAccount(account);
      });
  }, [serviceWorker, account, setAccount, setIsDeleted]);

  useEffect(() => {
    if (event === undefined) return;

    if (isAccountRenamedEvent(event) || isNewAccountCreatedEvent(event)) {
      if (event.account.id !== accountId) return;

      setAccount(event.account);
    }
  }, [event, setAccount]);

  return { account, isDeleted: false };
}
