import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Body from "./body";
import SignUp from "./signup";
import LogIn from "./login";
import Profile from "./Profile";
import Settings from "./Settings";
import SecuredRoute from "./SecuredRoute";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("login_token") ? true : false
  );

  useEffect(() => {
    if (localStorage.getItem("login_token") !== null) {
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
    }
  }, []);

  return (
    <Router>
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />

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
        <SecuredRoute
          loggedIn={loggedIn}
          exact
          path="/settings"
          component={Settings}
        ></SecuredRoute>
        <Route exact path="*">
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
