import React, { useEffect, useState } from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import api from "../config/api";

const AuthContext = React.createContext();

const initialState = {
  user: {},
  loggedIn: false,
};

export const AuthContextProvider = ({ children }) => {
  const [authState, setAuthState] = useState(initialState);

  const [snackState, setSnackState] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const closeSnack = () => {
    setSnackState((prevState) => ({ ...prevState, open: false }));
  };

  const handleLogin = ({ data }) => {
    api.accessToken = data.accessToken;
    localStorage.setItem("token", data.accessToken);
    setAuthState({ user: data.user, loggedIn: true });
    setSnackState({
      open: true,
      message: "Successfully logged in",
      severity: "success",
    });
  };

  const handleLogout = () => {
    api.accessToken = "";
    localStorage.removeItem("token");
    setAuthState(initialState);
    setSnackState({
      open: true,
      message: "Successfully logged out",
      severity: "success",
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.accessToken = token;
      api.getMe().then((res) => {
        setAuthState({ user: res.data, loggedIn: true });
      });
    }
  }, []);

  const publicFunctions = { handleLogin, handleLogout };
  return (
    <AuthContext.Provider value={{ ...authState, ...publicFunctions }}>
      {children}
      <Snackbar
        autoHideDuration={3000}
        open={snackState.open}
        onClose={closeSnack}
      >
        <Alert onClose={closeSnack} severity={snackState.severity}>
          {snackState.message}
        </Alert>
      </Snackbar>
    </AuthContext.Provider>
  );
};

export default AuthContext;
