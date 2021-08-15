import { makeStyles, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { Account } from '../../modules/crypto/core/ports/account.service/account.model';
import { AppTheme } from '../Theme';

const useStyles = makeStyles((theme: AppTheme) => ({
  root: {
    display: "flex",
  },
  info: {
    flex: "1 1",
    padding: theme.spacing(2),
  },
  name: {
    fontSize: "1.3rem",
  },
  issuer: {},
  menu: {
    flex: "0 1",
    padding: theme.spacing(2),
  },
}));

export interface AccountCardProps {
  account: Account;
}

export default function AccountCard({ account }: AccountCardProps) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <div className={classes.info}>
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
      </div>
      <div className={classes.menu}>
        <MoreHorizIcon />
      </div>
    </Paper>
  );
}
