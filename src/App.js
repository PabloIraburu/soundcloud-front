import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  DISCOVER,
  PROFILE,
  EDITPROFILE,
  HOME,
  LIBRARY,
  UPLOAD,
  MYSONGS,
} from "./routes/routes";
import { Landing } from "./pages/LandingPage/Landing";
import { Profile } from "./pages/Profile/Profile";
import { EditProfile } from "./pages/EditProfile/EditProfile";
import Discover from "./pages/Discover/NewLanding";
import { Library } from "./pages/Library/Library";
import { Upload } from "./components/Upload/Upload";
import {MySongs} from "./pages/MySongs/MySongs";
import {UserContextProvider} from "./components/Context/contextProvider";

function App() {
  const [isLogged, setIsLogged] = useState(true);

  return (
      <Router>
        <div>
          <Switch>
            <Route exact path={HOME} component={Landing} />
            <UserContextProvider>
              <Route exact path={DISCOVER} component={Discover} />
              <Route exact path={PROFILE} component={Profile} />
              <Route exact path={EDITPROFILE} component={EditProfile} />
              <Route exact path={LIBRARY} component={Library} />
              <Route exact path={UPLOAD} component={Upload} />
              <Route exact path={MYSONGS} component={MySongs} />
            </UserContextProvider>
          </Switch>
        </div>
      </Router>
);
}

export default App;
