import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';

import Pages from './pages';
import { ServiceWorkerProvider } from './providers/ServiceWorkerProvider';
import { theme } from './Theme';

function App() {
  return (
    <ServiceWorkerProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Pages></Pages>
        </CssBaseline>
      </ThemeProvider>
    </ServiceWorkerProvider>
  );
}

export default App;
