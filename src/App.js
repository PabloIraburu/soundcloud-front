import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import Discover from "./pages/discover";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
             <LandingPage/>
          </Route>
          <Route exact path='/discover'>
            <Discover />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
