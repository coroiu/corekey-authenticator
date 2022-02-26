import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

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
        <h1>About</h1>
        <p>
          This authenticator is the work of Andreas Coroiu and started as a
          side-project for learning React. It serves as proof of concept for a
          fully featured browser-based offline-capable OTP authenticator.
        </p>

        <h2>How it works</h2>
        <p>
          This authenticator relies heavily on non-exportable SubtleCrypto keys
          for security and protection. The keys are stored in your browsers
          storage and are not readable by the authenticator once the secrets
          have been sealed. While there is internal support for storing plain
          keys and generating codes for them using <code>optlib</code>, the
          feature is currently disabled.
        </p>

        <h2>Daily usage</h2>
        <p>
          Because this authenticator relies on the browser to store the keys and
          the browser may decide to free memory by deleting the keys, it is not
          recommended to use this authenticator without proper backups.
        </p>
      </MainContainer>
    </div>
  );
}
