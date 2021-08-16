import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { AppTheme } from '../Theme';

const useStyles = makeStyles((theme: AppTheme) => ({
  root: {
    display: "flex",
    paddingTop: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  left: {
    flex: "1 1",
  },
  center: {
    flex: "0 0",
    whiteSpace: "nowrap",
    color: theme.palette.text.secondary,
  },
  right: {
    flex: "1 1",
  },
  brand: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

export interface MainHeaderProps {
  className?: string;
}

export default function MainHeader({ className }: MainHeaderProps) {
  const classes = useStyles();

  return (
    <Container className={`${classes.root} ${className}`}>
      <div className={classes.left}></div>
      <div className={classes.center}>
        <Typography variant="h6" component="h1">
          <span className={classes.brand}>CoreKey</span> Authenticator
        </Typography>
      </div>
      <div className={classes.right}></div>
    </Container>
  );
}
