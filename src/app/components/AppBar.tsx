import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MuiAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export interface AppBarProps {
  isRoot?: boolean;
  title: string;
}

export default function AppBar({ title, isRoot = false }: AppBarProps) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <MuiAppBar position="static">
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
      </Toolbar>
    </MuiAppBar>
  );
}
