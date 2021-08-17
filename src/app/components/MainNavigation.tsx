import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import LockIcon from '@material-ui/icons/Lock';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import SettingsApplicationsOutlinedIcon from '@material-ui/icons/SettingsApplicationsOutlined';
import { useState } from 'react';
import { useHistory } from 'react-router';

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
  const [value, setValue] = useState("accounts");

  return (
    <div className={classes.root}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        className={classes.navigation}
        showLabels
      >
        <BottomNavigationAction
          label="Accounts"
          value="accounts"
          icon={value === "accounts" ? <LockIcon /> : <LockOutlinedIcon />}
        />
        <BottomNavigationAction
          label="Settings"
          value="settings"
          icon={
            value === "settings" ? (
              <SettingsApplicationsIcon />
            ) : (
              <SettingsApplicationsOutlinedIcon />
            )
          }
        />
      </BottomNavigation>

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
