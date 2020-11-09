import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from 'axios';

function NavBar({ loggedIn, setLoggedIn }) {



  const handleLogout = (e) => {
    axios.post(process.env.REACT_APP_API_URL + "api/logout", {}, {
      headers: {
        "authorization": "Bearer " + localStorage.getItem("login_token")
      }
    }).then(
      res => {
        //console.log("logging out token> " + localStorage.getItem("login_token"));
        //console.log(res.data);
        localStorage.removeItem("login_token");
        //console.log("after remove token> " + localStorage.getItem("login_token"));

        setLoggedIn(false);
      }
    ).catch(error => console.log(error.response.data));
  }

  return (
    <div className="row navbar text-dark">
      <Link to="/"><h1 className="text-dark navbar-brand">Portfal.io</h1> </Link>
      <div className="mr-right">
        {loggedIn ? (
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
            <div>
              <Link className="text-dark" to="/login"> Login </Link>
              <Link className="btn btn-info" to="/signup"> Sign Up </Link>
            </div>
          )

        }


      </div>
    </div>
  );
}

export default NavBar;
