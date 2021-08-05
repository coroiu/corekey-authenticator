import React from 'react';
import { ServiceWorkerProvider } from './providers/ServiceWorkerProvider';
import AccountList from './components/AccountList';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NewAccountPage from './pages/account/NewAccountPage';

function App() {
  return (
    <ServiceWorkerProvider>
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
    </ServiceWorkerProvider>
  );
}

export default App;
