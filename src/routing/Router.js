/** @format */

import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import { routes } from "../routes";
import CurrentTask from "../views/currentTask/CurrentTask";
import FinishedTask from "../views/finishedTask/FinishedTask";
import SingleTask from "../views/singleTask/SingleTask";

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path={routes.home} component={CurrentTask} />
        <Route path={routes.finishedTask} component={FinishedTask} />
        <Route path={routes.currentTask} component={CurrentTask} />
        <Route path={routes.task} component={SingleTask} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
