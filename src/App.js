import React, {useState} from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch ,Link} from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import Discover from "./pages/discover";
import Navbar from "./components/Navbar/Navbar";
import Stream from "./pages/stream/stream"
import Biblioteca from "./pages/biblioteca/biblioteca"
import Subir from "./pages/subir/subir";





function App() {

  //*
  const [isLogged, setIsLogged] = useState(true);
  
  return (
    <Router>
      <div>
        {isLogged && <Navbar />}
      

        <Switch>


          <Route exact path='/'>
             <LandingPage/>
          </Route>

          <Route path="/stream">
            <Stream />
          </Route>

          <Route path="/biblioteca">
            <Biblioteca />
          </Route>

          <Route path="/subir">
            <Subir />
          </Route>
        
          <Route exact path='/discover'>
            <Discover />
          </Route>

     

        </Switch>
      </div>
    </Router>
  );
}

export default App;
