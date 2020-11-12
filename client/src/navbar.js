import React from 'react';
import { Link } from "react-router-dom";
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
    <div className="row navbar text-dark m-3">
      <Link to="/"><h1 className="text-dark navbar-brand text-monospace">Portfal.io</h1> </Link>
      <div className="mr-right">
        {loggedIn ? (
          <div>
            <button className="btn btn-info" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
            <div>
              <Link className="text-dark btn" to="/login"> Login </Link>
              <Link className="btn btn-outline-info" to="/signup"> Sign Up </Link>
            </div>
          )

        }


      </div>
    </div>
  );
}

export default NavBar;
