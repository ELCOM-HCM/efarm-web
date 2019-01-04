import React from "react";
import ReactDOM from "react-dom";
import { createHashHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/css/styles.css?v=1.5.0";

import indexRoutes from "routes/index.jsx";
import { isTablet, isMobile } from "react-device-detect";
const hist = createHashHistory();
if (isMobile || isTablet) {
  location.href = "http://iot.e-farm.vn:9090";
}
ReactDOM.render(
  <Router history={hist}>
    <div>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return (
            <Route path={prop.path} component={prop.component} key={key} />
          );
        })}
      </Switch>
    </div>
  </Router>,
  document.getElementById("root")
);
