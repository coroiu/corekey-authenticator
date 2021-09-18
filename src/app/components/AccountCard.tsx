import { ButtonBase, makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useEffect, useRef, useState } from 'react';

import { Account } from '../../modules/crypto/core/ports/account.service/account.model';
import { useAccount } from '../hooks/UseAccountHook';
import { useSlides } from '../providers/SlidesProvider';
import AccountDetailsSlide from '../slides/AccountDetailsSlide';
import { AppTheme } from '../Theme';
import AccountInfo from './AccountInfo';
import AutoGeneratingCode from './AutoGeneratingCode';

const useStyles = makeStyles((theme: AppTheme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(2),
    alignItems: "initial",
  },
  new: {
    animation: `$newFadeOut 3000ms ${theme.transitions.easing.easeInOut}`,
  },
  "@keyframes newFadeOut": {
    "0%": {
      background: theme.palette.warning.main,
    },
    "100%": {
      background: "initial",
    },
  },
  content: {
    display: "flex",
  },
  info: {
    flex: "1 1",
    padding: theme.spacing(2),
    minWidth: 0,
  },
  menu: {
    flex: "0 1",
    padding: theme.spacing(2),
  },
  code: {
    margin: theme.spacing(0, 2, 2, 2),
  },
}));

export interface AccountCardProps {
  account: Account;
  isNew?: boolean;
}

export default function AccountCard(props: AccountCardProps) {
  const classes = useStyles(props);
  const { showSlide } = useSlides();
  const { isNew = false } = props;
  const { account, isDeleted } = useAccount(props.account);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isNew && !isDeleted) {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  if (isDeleted) return null;

  return (
    <ButtonBase
      className={`${classes.root} ${isNew ? classes.new : ""}`}
      elevation={0}
      component={Paper}
      ref={ref}
      onClick={() => showSlide(AccountDetailsSlide({ accountId: account.id }))}
    >
      <div className={classes.content}>
        <AccountInfo className={classes.info} account={account} />
        <div className={classes.menu}>
          <MoreHorizIcon />
        </div>
      </div>
      <div className={classes.code}>
        <AutoGeneratingCode account={account} />
      </div>
    </ButtonBase>
  );
}
