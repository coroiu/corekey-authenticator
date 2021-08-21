import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Pages from './Pages';
import { ServiceWorkerProvider } from './providers/ServiceWorkerProvider';
import { SlidesProvider } from './providers/SlidesProvider';
import { SnackbarProvider } from './providers/SnackbarProvider';
import { theme } from './Theme';

function App() {
  return (
    <BrowserRouter>
      <ServiceWorkerProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <SnackbarProvider>
              <SlidesProvider>
                <Pages></Pages>
              </SlidesProvider>
            </SnackbarProvider>
          </CssBaseline>
        </ThemeProvider>
      </ServiceWorkerProvider>
    </BrowserRouter>
  );
}

export default App;
