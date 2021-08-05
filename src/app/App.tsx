import React from "react";
import { ServiceWorkerProvider } from "./providers/ServiceWorkerProvider";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./Theme";
import Pages from "./pages";

function App() {
  return (
    <ServiceWorkerProvider>
      <ThemeProvider theme={theme}>
        <Pages></Pages>
      </ThemeProvider>
    </ServiceWorkerProvider>
  );
}

export default App;
