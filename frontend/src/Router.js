import React, { useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import AuthContext from "./context/AuthContext";

import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import CreateEventRequest from "./views/CreateEventRequest";
import EventRequests from "./views/EventRequests";
import EventRequest from "./views/EventRequest";
import EventProjects from "./views/EventProjects";
import EventProject from "./views/EventProject";
import Tasks from "./views/Tasks";
import Task from "./views/Task";
import RecruitmentRequests from "./views/RecruitmentRequests";
import CreateRecruitmentRequest from "./views/CreateRecruitmentRequest";
import RecruitmentRequest from "./views/RecruitmentRequest";
import FinancialRequests from "./views/FinancialRequests";
import CreateFinancialRequest from "./views/CreateFinancialRequest";
import FinancialRequest from "./views/FinancialRequest";

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
      <Route exact path={routes.eventProjects}>
        <EventProjects />
      </Route>
      <Route exact path={routes.eventProject}>
        <EventProject />
      </Route>
      <Route exact path={routes.tasks}>
        <Tasks />
      </Route>
      <Route exact path={routes.task}>
        <Task />
      </Route>
      <Route exact path={routes.createRecruitmentRequest}>
        <CreateRecruitmentRequest />
      </Route>
      <Route exact path={routes.recruitmentRequests}>
        <RecruitmentRequests />
      </Route>
      <Route exact path={routes.recruitmentRequest}>
        <RecruitmentRequest />
      </Route>
      <Route exact path={routes.financialRequests}>
        <FinancialRequests />
      </Route>
      <Route exact path={routes.financialRequest}>
        <FinancialRequest />
      </Route>
      <Route exact path={routes.createFinancialRequest}>
        <CreateFinancialRequest />
      </Route>
      <Route exact path={routes.home} />
      <Route>
        <Redirect to={routes.home} />
      </Route>
    </Switch>
  </Dashboard>
);

const NoAuthRoutes = () => (
  <Switch>
    <Route exact path={routes.login}>
      <Login />
    </Route>
    <Route>
      <Redirect to={routes.login} />
    </Route>
  </Switch>
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
