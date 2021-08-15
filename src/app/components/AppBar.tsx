import MuiAppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { PropsWithChildren } from 'react';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: ({ isRoot }: AppBarProps) => (isRoot ? "center" : "left"),
  },
}));

export interface AppBarProps {
  className?: string;
  isRoot?: boolean;
  title: string;
}

export default function AppBar(props: PropsWithChildren<AppBarProps>) {
  const { className, title, isRoot = false, children = null } = props;
  const classes = useStyles(props);
  const history = useHistory();

  return (
    <MuiAppBar position="static" className={className}>
      <Toolbar>
        {isRoot ? null : (
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="back"
            onClick={() => history.goBack()}
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        {children}
      </Toolbar>
    </MuiAppBar>
  );
}
