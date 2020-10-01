import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./views/Login";

import AuthContext from "./context/AuthContext";

const AuthRoutes = () => <Switch></Switch>;

const NoAuthRoutes = () => (
  <Route>
    <Login></Login>
  </Route>
);

const Router = () => {
  const authState = useContext(AuthContext);

  return (
    <BrowserRouter>
      {authState.loggedIn ? <AuthRoutes /> : <NoAuthRoutes />}
    </BrowserRouter>
  );
};

export default Router;
