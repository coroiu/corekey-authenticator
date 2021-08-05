import React from "react";
import AccountList from "../components/AccountList";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NewAccountPage from "./account/NewAccountPage";

export default function Pages() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/account/new">
          <NewAccountPage></NewAccountPage>
        </Route>
        <Route path="/">
          <AccountList></AccountList>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
