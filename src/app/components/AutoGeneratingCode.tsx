import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useEffect, useRef, useState } from 'react';

import { Account } from '../../modules/crypto/core/ports/account.service/account.model';
import { useServiceWorker } from '../providers/ServiceWorkerProvider';
import { AppTheme } from '../Theme';
import { random } from '../utils';
import Code, { codeHeight, CodeProps } from './Code';

const useStyles = makeStyles((theme: AppTheme) => ({
  generate: {
    height: codeHeight,
  },
}));

export interface AutoGeneratingCodeProps {
  account: Account;
}

export default function AutoGeneratingCode({
  account,
}: AutoGeneratingCodeProps) {
  const classes = useStyles();
  const timeout = useRef<number>();
  const serviceWorker = useServiceWorker();
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
    <>
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
    </>
  );
}
