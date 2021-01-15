import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as route from "./routes/routes";
import { MainRouter } from "./routes/MainRouter";

import { Landing } from "./pages/LandingPage/Landing";
import { UserContextProvider } from "./contexts/UserContext/contextProvider";



function App() {

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path={route.HOME} component={Landing} />
          <UserContextProvider>
            <MainRouter />
          </UserContextProvider>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
