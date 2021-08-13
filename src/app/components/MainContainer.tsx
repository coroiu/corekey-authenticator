import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import React, { PropsWithChildren } from 'react';

import { AppTheme } from '../Theme';

const useStyles = makeStyles((theme: AppTheme) => ({
  container: {
    paddingTop: theme.spacing(2),
  },
}));

export interface MainContainerProps {
  className?: string;
}

export default function MainContainer({
  className = "",
  children = null,
}: PropsWithChildren<MainContainerProps>) {
  const classes = useStyles();

  return (
    <Container className={`${classes.container} ${className}`}>
      <>{children ?? null}</>
    </Container>
  );
}
