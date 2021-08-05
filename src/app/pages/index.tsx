import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import NewAccountPage from "./account/NewAccountPage";
import HomePage from "./HomePage";

export default function Pages() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <HomePage></HomePage>
        </Route>
        <Route path="/account/new">
          <NewAccountPage></NewAccountPage>
        </Route>
        <Route path="*">
          <Redirect to="/"></Redirect>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
