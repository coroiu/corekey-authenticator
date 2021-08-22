import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { Account } from '../../modules/crypto/core/ports/account.service/account.model';
import { AppTheme } from '../Theme';

const useStyles = makeStyles((theme: AppTheme) => ({
  root: {},
  issuer: {
    fontSize: "1.3rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  name: {
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

export interface AccountHeaderProps {
  account: Account;
  className?: string;
}

export default function AccountInfo({
  account,
  className = "",
}: AccountHeaderProps) {
  const classes = useStyles();

  return (
    <div className={`${classes.root} ${className}`}>
      <Typography variant="h4" component="h3" className={classes.issuer}>
        {account.issuer}
      </Typography>
      <Typography
        color="textSecondary"
        variant="subtitle1"
        className={classes.name}
      >
        {account.name}
      </Typography>
    </div>
  );
}
