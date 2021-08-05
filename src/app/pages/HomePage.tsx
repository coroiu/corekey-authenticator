import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import AccountList from "../components/AccountList";
import AppBar from "../components/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function HomePage() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <AppBar title="CoreKey Authenticator" isRoot={true}></AppBar>
      <AccountList></AccountList>

      <Fab
        color="primary"
        className={classes.fab}
        onClick={() => history.push("/account/new")}
        aria-label="add"
      >
        <AddIcon />
      </Fab>
    </>
  );
}
