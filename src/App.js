import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import Discover from "./pages/discover";
import {HOME} from "./routes/routes";
import {DISCOVER} from "./routes/routes";
import {PROFILE} from "./routes/routes";
import { Profile } from "./pages/Profile/Profile";



function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path={HOME} component={LandingPage} />
          <Route exact path={DISCOVER} component={Discover} />
          <Route exact path={PROFILE} component={Profile} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
