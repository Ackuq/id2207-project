import React, { useContext, useEffect, useState } from "react";

import api from "../config/api";
import SnackContext from "./SnackContext";

const AuthContext = React.createContext();

const initialState = {
  user: {},
  loggedIn: false,
};

export const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authState, setAuthState] = useState(initialState);
  const setSnackState = useContext(SnackContext);

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
      api
        .getMe()
        .then((res) => {
          setAuthState({ user: res.data, loggedIn: true });
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const publicFunctions = { handleLogin, handleLogout };
  return (
    <AuthContext.Provider value={{ ...authState, ...publicFunctions }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
