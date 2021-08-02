import React from "react";
import Home from "../pages/Home";
import { Switch, Route } from "react-router-dom";

const routes = [
  {
    id: "home",
    path: "/",
    isExact: true,
    component: Home,
  },
];

const Routes = (props) => {
  return (
    <Switch>
      {routes.map((route) => {
        return (
          <Route
            key={route.id}
            path={route.path}
            component={route.component}
            exact={route.isExact}
          />
        );
      })}
    </Switch>
  );
};

export default Routes;
