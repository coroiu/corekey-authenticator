import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { MainLayout } from './components/MainLayout';
import HomePage from './pages/HomePage';
import { useServiceWorkerStatus } from './providers/ServiceWorkerProvider';

export default function Pages() {
  const { isReady } = useServiceWorkerStatus();

  if (!isReady) {
    return <>Loading...</>;
  }

  return (
    <MainLayout>
      <Switch>
        <Route exact path="/">
          <HomePage></HomePage>
        </Route>
        <Route path="*">
          <Redirect to="/"></Redirect>
        </Route>
      </Switch>
    </MainLayout>
  );
}
