import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { MainLayout } from './components/MainLayout';
import NewAccountPage from './pages/account/NewAccountPage';
import HomePage from './pages/HomePage';
import { useServiceWorkerStatus } from './providers/ServiceWorkerProvider';

export default function Pages() {
  const { isReady } = useServiceWorkerStatus();

  if (!isReady) {
    return <>Loading...</>;
  }

  return (
    <BrowserRouter>
      <MainLayout>
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
      </MainLayout>
    </BrowserRouter>
  );
}
