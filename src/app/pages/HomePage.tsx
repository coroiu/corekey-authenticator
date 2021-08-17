import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import { useHistory } from 'react-router';

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
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function HomePage() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <MainHeader className={classes.appBar} />
      <MainContainer className={classes.mainContainer}>
        <AccountList></AccountList>
      </MainContainer>

      <Fab
        color="primary"
        className={classes.fab}
        onClick={() => history.push("/account/new")}
        aria-label="add"
      >
        <AddIcon />
      </Fab>
    </div>
  );
}
