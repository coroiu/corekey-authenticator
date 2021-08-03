import React from 'react';
import './App.css';
import { ServiceWorkerProvider } from './providers/ServiceWorkerProvider';
import AccountList from './components/AccountList';

function App() {
  return (
    <ServiceWorkerProvider>
      <div className="App">
        <AccountList></AccountList>
      </div>
    </ServiceWorkerProvider>
  );
}

export default App;
