import React from "react";
import { ThemeProvider } from "@material-ui/core";

import { AuthContextProvider } from "./context/AuthContext";
import Router from "./Router";
import theme from "./config/theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </ThemeProvider>
  );
};

export default App;
