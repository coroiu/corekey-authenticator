import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import AccountList from '../components/AccountList';
import MainContainer from '../components/MainContainer';
import MainHeader from '../components/MainHeader';
import { AppTheme } from '../Theme';

const useStyles = makeStyles((theme: AppTheme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  appBar: {
    flex: "0 0",
  },
  mainContainer: {
    backgroundColor: theme.palette.background.default,
    flex: "1 1",
  },
}));

export default function HomePage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MainHeader className={classes.appBar} />
      <MainContainer className={classes.mainContainer} topSpacingType="margin">
        <AccountList></AccountList>
      </MainContainer>
    </div>
  );
}
