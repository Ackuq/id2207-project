import React, { useState } from "react";

const AuthContext = React.createContext();

const initialState = {
  user: {},
  token: "",
  loggedIn: false,
};

export const AuthContextProvider = ({ children }) => {
  const [authState, setAuthState] = useState(initialState);

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
