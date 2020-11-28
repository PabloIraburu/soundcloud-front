import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import Discover from "./pages/discover";
import {HOME, NEWLANDING, DISCOVER, PROFILE} from "./routes/routes";
import { Profile } from "./pages/Profile/Profile";
import NewLanding from "./pages/NewLanding/NewLanding";



function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path={HOME} component={LandingPage} />
          <Route exact path={DISCOVER} component={Discover} />
          <Route exact path={PROFILE} component={Profile} />
          <Route exact path={NEWLANDING} component={NewLanding} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
