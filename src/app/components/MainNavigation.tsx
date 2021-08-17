import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { makeStyles } from '@material-ui/core/styles';
import LockIcon from '@material-ui/icons/Lock';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import SettingsApplicationsOutlinedIcon from '@material-ui/icons/SettingsApplicationsOutlined';
import { useState } from 'react';

import { AppTheme } from '../Theme';

const useStyles = makeStyles((theme: AppTheme) => ({
  root: {
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
}));

export default function MainNavigation() {
  const classes = useStyles();
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
    </div>
  );
}
