import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import React, { PropsWithChildren } from 'react';

import { AppTheme } from '../Theme';

const useStyles = makeStyles((theme: AppTheme) => ({
  container: {
    marginTop: (props: MainContainerProps) =>
      props.topSpacingType === "margin" ? theme.spacing(2) : undefined,
    paddingTop: (props: MainContainerProps) =>
      props.topSpacingType === "padding" || props.topSpacingType === undefined
        ? theme.spacing(2)
        : undefined,
    overflowY: "auto",
  },
}));

export interface MainContainerProps {
  className?: string;
  topSpacingType?: "padding" | "margin";
}

export default function MainContainer(
  props: PropsWithChildren<MainContainerProps>
) {
  const { className = "", children = null } = props;
  const classes = useStyles(props);

  return (
    <Container className={`${classes.container} ${className}`}>
      <>{children ?? null}</>
    </Container>
  );
}
