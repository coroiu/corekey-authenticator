import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "../../components/AppBar";
import ManualAccountInput from "../../components/ManualAccountInput";
import { AppTheme } from "../../Theme";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: AppTheme) => ({
  container: {
    paddingTop: theme.spacing(2),
  },
}));

export default function NewAccountPage() {
  const classes = useStyles();
  const [key, setKey] = useState("");

  return (
    <>
      <AppBar title="New account">
        <Button color="inherit">Save</Button>
      </AppBar>
      <Container className={classes.container}>
        <ManualAccountInput onChange={setKey}></ManualAccountInput>
      </Container>
    </>
  );
}
