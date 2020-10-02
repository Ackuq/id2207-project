import React from "react";
import { ThemeProvider } from "@material-ui/core";

import { AuthContextProvider } from "./context/AuthContext";
import { SnackContextProvider } from "./context/SnackContext";
import Router from "./Router";
import theme from "./config/theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SnackContextProvider>
        <AuthContextProvider>
          <Router />
        </AuthContextProvider>
      </SnackContextProvider>
    </ThemeProvider>
  );
};

export default App;
