import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import InfoIcon from '@material-ui/icons/Info';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import LockIcon from '@material-ui/icons/Lock';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useState } from 'react';
import { useHistory } from 'react-router';

import { useSlides } from '../providers/SlidesProvider';
import NewAccountScanSlide from '../slides/NewAccountScanSlide';
import { AppTheme } from '../Theme';

const useStyles = makeStyles((theme: AppTheme) => ({
  root: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    background:
      theme.palette.type === "light"
        ? theme.palette.background.paper
        : theme.palette.secondary.main,
  },
  navigation: {
    flex: "1",
    maxWidth: "400px",
    justifyContent: "space-between",
  },
  fab: {
    position: "absolute",
    top: "-30%",
    left: "50%",
    transform: "translate(-50%, 0)",
  },
}));

export default function MainNavigation() {
  const classes = useStyles();
  const history = useHistory();
  const { showSlide } = useSlides();
  const path = history.location.pathname;

  return (
    <div className={classes.root}>
      <BottomNavigation value={path} className={classes.navigation} showLabels>
        <BottomNavigationAction
          label="Accounts"
          value="/accounts"
          onClick={() => history.push("/accounts")}
          icon={path === "/accounts" ? <LockIcon /> : <LockOutlinedIcon />}
        />
        <BottomNavigationAction
          label="About"
          value="/about"
          onClick={() => history.push("/about")}
          icon={path === "/about" ? <InfoIcon /> : <InfoOutlinedIcon />}
        />
        {/* <BottomNavigationAction
          label="Settings"
          value="settings"
          onClick={() => history.push("/settings")}
          icon={
            value === "settings" ? (
              <SettingsApplicationsIcon />
            ) : (
              <SettingsApplicationsOutlinedIcon />
            )
          }
        /> */}
      </BottomNavigation>
      <Fab
        color="primary"
        className={classes.fab}
        onClick={() => showSlide(NewAccountScanSlide)}
        aria-label="add"
      >
        <AddIcon />
      </Fab>
    </div>
  );
}
