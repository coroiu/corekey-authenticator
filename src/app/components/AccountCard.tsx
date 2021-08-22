import { ButtonBase, makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useEffect, useRef, useState } from 'react';

import { Account } from '../../modules/crypto/core/ports/account.service/account.model';
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
}

export default function AccountCard({ account }: AccountCardProps) {
  const classes = useStyles();
  const { showSlide } = useSlides();

  return (
    <ButtonBase
      className={classes.root}
      elevation={0}
      component={Paper}
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
