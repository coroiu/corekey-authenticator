import { ButtonBase, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useEffect, useRef, useState } from 'react';

import { Account } from '../../modules/crypto/core/ports/account.service/account.model';
import { useServiceWorker } from '../providers/ServiceWorkerProvider';
import { useSlides } from '../providers/SlidesProvider';
import AccountDetailsSlide from '../slides/AccountDetailsSlide';
import { AppTheme } from '../Theme';
import { random } from '../utils';
import Code, { codeHeight, CodeProps } from './Code';

const useStyles = makeStyles((theme: AppTheme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(2),
    alignItems: "initial",
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
    margin: theme.spacing(0, 2, 2, 2),
  },
  generate: {
    height: codeHeight,
  },
}));

export interface AccountCardProps {
  account: Account;
}

export default function AccountCard({ account }: AccountCardProps) {
  const classes = useStyles();
  const timeout = useRef<number>();
  const serviceWorker = useServiceWorker();
  const { showSlide } = useSlides();
  const [codeProps, setCodeProps] = useState<CodeProps>({
    code: " ".repeat(account.key.length),
  });

  async function generateCode(): Promise<void> {
    const code =
      await serviceWorker.crypto.accountService.generateCodeForAccount(
        account.id
      );
    if (code === undefined) {
      throw new Error(`Could not generate code for account: ${account.id}`);
    }

    if (code.expiresAt === undefined) {
      return setCodeProps({ code: code.value });
    }

    const hue = Math.ceil(
      random(Math.ceil(code.expiresAt.getTime() / 1000)) * 360
    );
    setCodeProps({
      code: code.value,
      color: `hsla(${hue}, 25%, 50%, 0.15)`,
    });

    timeout.current = window.setTimeout(
      generateCode,
      code.expiresAt.getTime() - Date.now()
    );
  }

  useEffect(() => {
    if (account.key.type === "tkey") {
      generateCode();
    }

    return () => clearTimeout(timeout.current);
  }, []);

  const codeIsEmpty = codeProps.code.trim().length === 0;

  return (
    <ButtonBase
      className={classes.root}
      elevation={0}
      component={Paper}
      onClick={() => showSlide(AccountDetailsSlide({ accountId: account.id }))}
    >
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
        {account.key.type === "tkey" && <Code {...codeProps} />}
        {account.key.type === "hkey" && codeIsEmpty && (
          <Button
            fullWidth
            variant="outlined"
            className={classes.generate}
            onClick={(event) => {
              event.stopPropagation();
              generateCode();
            }}
          >
            Generate code
          </Button>
        )}
        {account.key.type === "hkey" && !codeIsEmpty && (
          <Code {...codeProps} animateInitial={true} />
        )}
      </div>
    </ButtonBase>
  );
}
