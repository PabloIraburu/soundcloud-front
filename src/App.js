import React, {useState} from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import  LandingPage  from "./pages/LandingPage/LandingPage";
import { DISCOVER, PROFILE, HOME, LIBRARY, UPLOAD } from "./routes/routes";
import { Profile } from "./pages/Profile/Profile";
import { Discover } from "./pages/Discover/Discover";
import { Library } from "./pages/Library/Library"
import { Upload } from "./pages/Upload/Upload";
import Navbar from './components/Navbar/Navbar';


function App() {
  const [isLogged, setIsLogged] = useState(true);
  
  return (
    <Router>
      <div>
        {isLogged && <Navbar />}
    
        <Switch>
          <Route exact path={HOME} component={LandingPage} />
          <Route exact path={DISCOVER} component={Discover} />
          <Route exact path={PROFILE} component={Profile} />
          <Route exact path={NEWLANDING} component={NewLanding} />
          <Route exact path={LIBRARY} component={Library} />
          <Route exact path={UPLOAD} component={Upload} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;
