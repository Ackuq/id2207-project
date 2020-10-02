import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import AuthContext from "./context/AuthContext";

import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import CreateEventRequest from "./views/CreateEventRequest";
import EventRequests from "./views/EventRequests";
import EventRequest from "./views/EventRequest";

import * as routes from "./config/routes";

const AuthRoutes = () => (
  <Dashboard>
    <Switch>
      <Route exact path={routes.createEventRequest}>
        <CreateEventRequest />
      </Route>
      <Route exact path={routes.eventRequests}>
        <EventRequests />
      </Route>
      <Route exact path={routes.eventRequest}>
        <EventRequest />
      </Route>
    </Switch>
  </Dashboard>
);

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
