import { makeStyles, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

import { Account } from '../../modules/crypto/core/ports/account.service/account.model';
import { AppTheme } from '../Theme';

const useStyles = makeStyles((theme: AppTheme) => ({
  root: {
    padding: theme.spacing(2),
  },
  name: {
    fontSize: "1.3rem",
  },
  issuer: {},
}));

export interface AccountCardProps {
  account: Account;
}

export default function AccountCard({ account }: AccountCardProps) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography variant="h4" component="h3" className={classes.name}>
        {account.name}
      </Typography>
      <Typography
        color="textSecondary"
        variant="subtitle1"
        className={classes.issuer}
      >
        {account.issuer}
      </Typography>
    </Paper>
  );
}
