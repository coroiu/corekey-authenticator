import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';

import { Account } from '../../modules/crypto/core/ports/account.service/account.model';
import AccountInfo from '../components/AccountInfo';
import AutoGeneratingCode from '../components/AutoGeneratingCode';
import { useServiceWorker } from '../providers/ServiceWorkerProvider';
import { Slide, SlideProps } from '../providers/SlidesProvider';
import { AppTheme } from '../Theme';

const useStyles = makeStyles((theme: AppTheme) => ({
  root: {},
  main: {
    padding: theme.spacing(4, 2),
  },
  info: {
    marginBottom: theme.spacing(2),
  },
  code: {},
}));

export interface AccountDetailsSlideProps {
  accountId: string;
}

function AccountDetailsSlide({
  close,
  componentProps: { accountId },
}: SlideProps<AccountDetailsSlideProps>) {
  const classes = useStyles();
  const serviceWorker = useServiceWorker();
  const [account, setAccount] = useState<Account | null>(null);

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

  return (
    <div className={classes.root}>
      <Paper className={classes.main} square>
        <AccountInfo className={classes.info} account={account} />
        <div className={classes.code}>
          <AutoGeneratingCode account={account} size="large" />
        </div>
      </Paper>
    </div>
  );
}

export default (
  props: AccountDetailsSlideProps
): Slide<AccountDetailsSlideProps> => ({
  title: "Account details",
  element: AccountDetailsSlide,
  paper: "inverted",
  props,
});
