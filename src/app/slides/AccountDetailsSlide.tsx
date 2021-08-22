import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { useEffect, useState } from 'react';

import { Account } from '../../modules/crypto/core/ports/account.service/account.model';
import AccountInfo from '../components/AccountInfo';
import AutoGeneratingCode from '../components/AutoGeneratingCode';
import { useCodes } from '../providers/CodesProvider';
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
  const { copy } = useCodes(accountId, { autoGenerate: false });
  const [account, setAccount] = useState<Account | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  function deleteAccount() {
    setDeleteDialogOpen(false);
    close();
  }

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
    <>
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
            <Button
              className={classes.copy}
              startIcon={<FileCopyOutlinedIcon />}
              onClick={copy}
            >
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
            onClick={() => setDeleteDialogOpen(true)}
          >
            Delete
          </Button>
        </div>
      </div>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(true)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          Permanently delete this account?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            <Typography variant="body1" gutterBottom>
              Deleting, or in other ways losing, an authentication key that is
              actively being used to protect an account might result in
              permanent loss of access to that account. Make sure this key is
              not being used to log in to this account before deleting it.
            </Typography>
            <Typography variant="body1" gutterBottom>
              <em>{account.name}</em> will be permanently removed from this
              device.
            </Typography>
            <Typography variant="body1" gutterBottom>
              Do you want to continue?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="secondary">
            Abort
          </Button>
          <Button onClick={deleteAccount} color="primary" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
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
