import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import React, { PropsWithChildren } from 'react';

import { AppTheme } from '../Theme';

const useStyles = makeStyles((theme: AppTheme) => ({
  container: {
    paddingTop: theme.spacing(2),
  },
}));

export default function MainContainer({
  children = null,
}: PropsWithChildren<{}>) {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <>{children ?? null}</>
    </Container>
  );
}
