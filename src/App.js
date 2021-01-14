import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import {
  DISCOVER,
  PROFILE,
  EDITPROFILE,
  HOME,
  LIBRARY,
  UPLOAD,
  MYSONGS,
  SONGS
} from "./routes/routes";
import { Landing } from "./pages/LandingPage/Landing";
import { Profile } from "./pages/Profile/Profile";
import { EditProfile } from "./pages/EditProfile/EditProfile";
import Discover from "./pages/Discover/NewLanding";
import { Library } from "./pages/Library/Library";
import { Upload } from "./components/Upload/Upload";
import { MySongs } from "./pages/MySongs/MySongs";
import { Songs } from "./pages/Songs/Songs";
import { UserContextProvider } from "./components/UserContext/contextProvider";
import { getToken } from "./utils/LocalStorage.utils";


function App() {
  // const [isLogged, setIsLogged] = useState(true);

  const PrivateRoute = ({ component: Component, path }) => (
    <Route
      path={path}
      render={() => getToken() ? <Component /> : <Redirect to={HOME} />}
    />
  )

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path={HOME} component={Landing} />
          <UserContextProvider>
            <PrivateRoute exact path={DISCOVER} component={Discover} />
            <PrivateRoute exact path={PROFILE} component={Profile} />
            <PrivateRoute exact path={EDITPROFILE} component={EditProfile} />
            <PrivateRoute exact path={LIBRARY} component={Library} />
            <PrivateRoute exact path={UPLOAD} component={Upload} />
            <PrivateRoute exact path={MYSONGS} component={MySongs} />
            <PrivateRoute exact path={SONGS} component={Songs} />
          </UserContextProvider>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
