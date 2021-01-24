import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as route from "./routes/routes";
import { MainRouter } from "./routes/MainRouter";

import { Landing } from "./pages/LandingPage/Landing";




function App() {

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path={route.HOME} component={Landing} />
          <MainRouter />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
