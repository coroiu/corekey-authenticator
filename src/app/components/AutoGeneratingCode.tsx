import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import { Account } from '../../modules/crypto/core/ports/account.service/account.model';
import { useCodes } from '../providers/CodesProvider';
import { AppTheme } from '../Theme';
import { random } from '../utils';
import Code, { codeHeight, CodeProps, largeCodeHeight } from './Code';

const useStyles = makeStyles((theme: AppTheme) => ({
  generate: {
    height: ({ size }: AutoGeneratingCodeProps) =>
      size === "large" ? largeCodeHeight : codeHeight,
  },
}));

export interface AutoGeneratingCodeProps
  extends Omit<
    Partial<CodeProps>,
    "code" | "animateInitial" | "color" | "key"
  > {
  account: Account;
}

export default function AutoGeneratingCode(props: AutoGeneratingCodeProps) {
  const { account } = props;
  const classes = useStyles(props);
  const { code, generate } = useCodes(account.id, {
    autoGenerate: account.key.type === "tkey",
  });

  let codeProps: CodeProps;
  if (code === undefined) {
    codeProps = {
      code: " ".repeat(account.key.length),
    };
  } else {
    if (code?.expiresAt === undefined) {
      codeProps = { code: code.value };
    } else {
      const hue = Math.ceil(
        random(Math.ceil(code.expiresAt.getTime() / 1000)) * 360
      );
      codeProps = {
        code: code.value,
        color: `hsla(${hue}, 25%, 50%, 0.15)`,
      };
    }
  }

  const codeIsEmpty = codeProps.code.trim().length === 0;

  return (
    <>
      {account.key.type === "tkey" && <Code {...codeProps} {...props} />}
      {account.key.type === "hkey" && codeIsEmpty && (
        <Button
          fullWidth
          variant="outlined"
          className={classes.generate}
          onClick={(event) => {
            event.stopPropagation();
            generate();
          }}
        >
          Generate code
        </Button>
      )}
      {account.key.type === "hkey" && !codeIsEmpty && (
        <Code {...codeProps} {...props} animateInitial={true} />
      )}
    </>
  );
}
