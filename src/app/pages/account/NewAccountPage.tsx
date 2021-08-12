import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { useAsync } from "react-async";
import AppBar from "../../components/AppBar";
import ManualAccountInput, {
  AccountInformation,
} from "../../components/ManualAccountInput";
import { AppTheme } from "../../Theme";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme: AppTheme) => ({
  container: {
    paddingTop: theme.spacing(2),
  },
}));

export default function NewAccountPage() {
  const classes = useStyles();
  const history = useHistory();
  const [account, setAccount] = useState<AccountInformation>();
  const { data, error, run, isPending, isFulfilled } = useAsync({
    async deferFn() {
      console.log("save", account);
    },
  });

  if (isFulfilled) {
    history.push("/");
  }

  return (
    <>
      <AppBar title="New account">
        <Button color="inherit" onClick={run}>
          Save
        </Button>
      </AppBar>
      <Container className={classes.container}>
        <ManualAccountInput onChange={setAccount} />
      </Container>
    </>
  );
}
