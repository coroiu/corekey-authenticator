import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { useEffect, useState } from 'react';

import { Account } from '../../modules/crypto/core/ports/account.service/account.model';
import AccountInfo from '../components/AccountInfo';
import AutoGeneratingCode from '../components/AutoGeneratingCode';
import { useServiceWorker } from '../providers/ServiceWorkerProvider';
import { Slide, SlideProps } from '../providers/SlidesProvider';
import { AppTheme } from '../Theme';

const useStyles = makeStyles((theme: AppTheme) => ({
  root: {},
  info: {
    padding: theme.spacing(4, 2),
    marginBottom: theme.spacing(4),
  },
  code: {
    padding: theme.spacing(4, 2),
    marginBottom: theme.spacing(4),
  },
  buttonGroup: {
    padding: theme.spacing(0, 2),
    marginBottom: theme.spacing(4),
  },
  copy: {
    height: theme.spacing(8),
  },
  rename: {
    height: theme.spacing(6),
  },
  delete: {
    height: theme.spacing(6),
  },
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
      <Paper className={classes.info} square>
        <AccountInfo account={account} />
      </Paper>

      <Paper className={classes.code} square>
        <AutoGeneratingCode account={account} size="large" />
      </Paper>

      <div className={classes.buttonGroup}>
        <ButtonGroup
          variant="outlined"
          orientation="vertical"
          color="secondary"
          size="large"
          fullWidth
        >
          <Button className={classes.copy} startIcon={<FileCopyOutlinedIcon />}>
            Copy code
          </Button>
          <Button className={classes.rename} startIcon={<EditOutlinedIcon />}>
            Rename
          </Button>
        </ButtonGroup>
      </div>

      <div className={classes.buttonGroup}>
        <Button
          className={classes.delete}
          variant="outlined"
          color="primary"
          size="large"
          fullWidth
          startIcon={<FileCopyOutlinedIcon />}
        >
          Delete
        </Button>
      </div>
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
