import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';
import NavBar from './navbar';
import Body from './body';
import SignUp from './signup';
import LogIn from './login';
import Footer from './footer';

function App() {

  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("login_token") ? true : false);

  axios.post(process.env.REACT_APP_API_URL + "api/login/user", {}, {
    headers: {
      "authorization": "Bearer " + localStorage.getItem("login_token")
    }
  }).then(
    res => {
      console.log("login token valid");
    }
  ).catch(error => {
    console.log(error.response.data);
    localStorage.clear();
    setLoggedIn(false);
  });


  console.log("Welcome to Portfal.io");

  return (
    <div className="container-fluid">
      <Router>
        <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />

        <Switch>
          <Route exact path="/"> <Body loggedIn={loggedIn} /> </Route>
          {loggedIn ? <Redirect to="/" /> :
            <>
              <Route exact path="/signup"> <SignUp /> </Route>
              <Route exact path="/login"> <LogIn loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> </Route>
            </>
          }
          <Redirect to="/" />
        </Switch>


        <Footer />
      </Router>
    </div>
  );
}

export default App;
