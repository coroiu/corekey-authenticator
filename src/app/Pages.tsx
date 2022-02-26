import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { MainLayout } from './components/MainLayout';
import AboutPage from './pages/AboutPage';
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
        <Route exact path="/accounts">
          <HomePage></HomePage>
        </Route>
        <Route exact path="/about">
          <AboutPage></AboutPage>
        </Route>
        <Route path="*">
          <Redirect to="/accounts"></Redirect>
        </Route>
      </Switch>
    </MainLayout>
  );
}
