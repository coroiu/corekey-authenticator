import { makeStyles, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

import { Account } from '../../modules/crypto/core/ports/account.service/account.model';
import { AppTheme } from '../Theme';

const useStyles = makeStyles((theme: AppTheme) => ({
  root: {},
}));

export interface AccountCardProps {
  account: Account;
}

export default function AccountCard({ account }: AccountCardProps) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography variant="h3">{account.name}</Typography>
      <Typography variant="subtitle1">{account.issuer}</Typography>
    </Paper>
  );
}
