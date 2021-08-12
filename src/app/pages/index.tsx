import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { useServiceWorkerStatus } from '../providers/ServiceWorkerProvider';
import NewAccountPage from './account/NewAccountPage';
import HomePage from './HomePage';

export default function Pages() {
  const { isReady } = useServiceWorkerStatus();

  if (!isReady) {
    return <>Loading...</>;
  }

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
