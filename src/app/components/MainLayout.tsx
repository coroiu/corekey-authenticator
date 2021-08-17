import { makeStyles } from '@material-ui/core';
import { PropsWithChildren } from 'react';

import MainNavigation from './MainNavigation';

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  content: {
    flex: "1 1",
    minHeight: 0,
  },
});

export function MainLayout({ children }: PropsWithChildren<{}>) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>{children}</div>
      <MainNavigation />
    </div>
  );
}
