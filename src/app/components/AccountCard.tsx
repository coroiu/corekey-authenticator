import { makeStyles, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useEffect, useState } from 'react';

import { Account } from '../../modules/crypto/core/ports/account.service/account.model';
import { useServiceWorker } from '../providers/ServiceWorkerProvider';
import { AppTheme } from '../Theme';
import { fakeCode } from '../utils';
import Code, { CodeProps } from './Code';

const useStyles = makeStyles((theme: AppTheme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(2),
  },
  content: {
    display: "flex",
  },
  info: {
    flex: "1 1",
    padding: theme.spacing(2),
    minWidth: 0,
  },
  issuer: {
    fontSize: "1.3rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  name: {
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  menu: {
    flex: "0 1",
    padding: theme.spacing(2),
  },
  code: {
    padding: theme.spacing(0, 2, 2, 2),
  },
}));

export interface AccountCardProps {
  account: Account;
}

export default function AccountCard({ account }: AccountCardProps) {
  const classes = useStyles();
  const serviceWorker = useServiceWorker();
  const [codeProps, setCodeProps] = useState<CodeProps>({
    code: {
      generatedAt: new Date(),
      value: "",
    },
    color: undefined,
  });

  useEffect(() => {
    function generateCode() {
      const c = fakeCode(6);
      const d = new Date();
      const h = Math.ceil(Math.random() * 360);
      setCodeProps({
        code: { generatedAt: d, value: c },
        color: `hsla(${h}, 50%, 50%, 0.15)`,
      });
    }

    generateCode();
    const interval = setInterval(() => {
      generateCode();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Paper className={classes.root} elevation={0}>
      <div className={classes.content}>
        <div className={classes.info}>
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
        <div className={classes.menu}>
          <MoreHorizIcon />
        </div>
      </div>
      <div className={classes.code}>
        <Code {...codeProps} />
      </div>
    </Paper>
  );
}
