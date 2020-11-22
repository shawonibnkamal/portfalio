import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";
import Body from "./body";
import SignUp from "./signup";
import LogIn from "./login";
import Profile from "./Profile";
import Settings from "./Settings";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("login_token") ? true : false
  );

  useEffect(() => {
    axios
      .post(
        process.env.REACT_APP_API_URL + "api/login/user",
        {},
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("login_token"),
          },
        }
      )
      .then((res) => {
        //console.log("login token valid");
      })
      .catch((error) => {
        //console.log(error.response.data);
        localStorage.clear();
        setLoggedIn(false);
      });
  }, []);

  return (
    <Router>
      <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />

      <Switch>
        <Route exact path="/">
          <Body loggedIn={loggedIn} />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/login">
          <LogIn loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        </Route>
        <Route exact path="/settings">
          <Settings />
        </Route>
        <Route exact path="*">
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
