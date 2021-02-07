import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Navbar({ loggedIn, setLoggedIn, userInfo }) {
  const handleLogout = (e) => {
    e.preventDefault();
    axios
      .post(
        process.env.REACT_APP_API_URL + "api/logout",
        {},
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("login_token"),
          },
        }
      )
      .then((res) => {
        //console.log("logging out token> " + localStorage.getItem("login_token"));
        //console.log(res.data);
        localStorage.removeItem("login_token");
        //console.log("after remove token> " + localStorage.getItem("login_token"));

        setLoggedIn(false);
      })
      .catch((error) => console.log(error.response.data));
  };

  return (
    <div className="navbar text-dark">
      <div class="nav-logo-container">
        <Link to="/" className="navbar-brand text-monospace ">
          Portfal.io
        </Link>
      </div>
      {loggedIn ? (
        <>
          <div>
            <Link to="/">
              <button className="btn btn-custom1 mr-2">Dashboard</button>
            </Link>
            <Link className="btn btn-custom1 mr-2" to="/settings">
              Settings
            </Link>
            <Link className="btn btn-custom1 mr-2" to="/contact">
              <i className="fas fa-question-circle"></i>
            </Link>
          </div>
          <div className="mr-right">
            <div className="dropdown">
              <button
                className="btn btn-custom2 dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Account
              </button>
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="dropdownMenuButton"
              >
                <a className="dropdown-item" href={"/" + userInfo.username}>
                  Profile
                </a>
                <a className="dropdown-item" href="/" onClick={handleLogout}>
                  Logout
                </a>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <Link className="text-dark btn" to="/contact">
              <i className="far fa-question-circle"></i>
            </Link>
            <Link className="text-dark btn mr-2" to="/login">
              {" "}
              Login{" "}
            </Link>
            <Link className="btn btn-outline-dark" to="/signup">
              {" "}
              Sign Up{" "}
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Navbar;
