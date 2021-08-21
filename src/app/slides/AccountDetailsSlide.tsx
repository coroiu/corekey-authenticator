import { useEffect, useState } from 'react';

import { Account } from '../../modules/crypto/core/ports/account.service/account.model';
import { useServiceWorker } from '../providers/ServiceWorkerProvider';
import { Slide, SlideProps } from '../providers/SlidesProvider';

export interface AccountDetailsSlideProps {
  accountId: string;
}

function AccountDetailsSlide({
  close,
  componentProps: { accountId },
}: SlideProps<AccountDetailsSlideProps>) {
  const serviceWorker = useServiceWorker();
  const [account, setAccount] = useState<Account | null>(null);
  console.log(accountId);

  useEffect(() => {
    serviceWorker.crypto.accountService
      .getAccountById(accountId)
      .then((account) => {
        if (account === undefined) {
          return close();
        }

        setAccount(account);
      });
  }, [serviceWorker, setAccount]);

  if (account === null) return null;

  return <> ACCOUNT DETAILS {accountId}</>;
}

export default (
  props: AccountDetailsSlideProps
): Slide<AccountDetailsSlideProps> => ({
  title: "Account details",
  element: AccountDetailsSlide,
  props,
});
