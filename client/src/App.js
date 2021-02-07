import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./navbar";
import Body from "./body";
import SignUp from "./signup";
import LogIn from "./login";
import Profile from "./Profile";
import Settings from "./Settings";
import SecuredRoute from "./SecuredRoute";
import Contact from "./Contact";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("login_token") ? true : false
  );

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    document.title = "Portfal.io | Simplified Portfolio Builder";
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
          setUserInfo(res.data.user_info);
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
      <Switch>
        <Route exact path="/">
          <Navbar
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            userInfo={userInfo}
          />
          <Body loggedIn={loggedIn} />
        </Route>
        <Route exact path="/signup">
          <Navbar
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            userInfo={userInfo}
          />
          <SignUp />
        </Route>
        <Route exact path="/login">
          <Navbar
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            userInfo={userInfo}
          />
          <LogIn loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        </Route>
        <SecuredRoute
          loggedIn={loggedIn}
          exact
          path="/settings"
          component={() => {
            return (
              <>
                <Navbar
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  userInfo={userInfo}
                />
                <Settings />
              </>
            );
          }}
        ></SecuredRoute>

        <Route exact path="/contact">
          <Navbar
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            userInfo={userInfo}
          />
          <Contact />
        </Route>

        <Route exact path="*">
          <Navbar
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            userInfo={userInfo}
          />

          <Profile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
