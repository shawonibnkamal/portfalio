import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function LogIn({ loggedIn, setLoggedIn }) {
  const [userID, setUserID] = useState("");
  const [userPass, setUserPass] = useState("");
  const history = useHistory();

  //used to prevent access to this page if user is logged in
  useEffect(() => {
    if (localStorage.getItem("login_token")) {
      history.push("/");
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    //send data to server and recieve token
    axios
      .post(process.env.REACT_APP_API_URL + "api/login", {
        userID: userID,
        password: userPass,
      })
      .then((res) => {
        //console.log("loggin in with token> " + res.data.login_token);
        localStorage.setItem("login_token", res.data.login_token);

        setLoggedIn(true);
        history.push("/");
      })
      .catch((error) => {
        //console.log(error.response.data);
        alert("Invalid login credentials");
      });
  };

  return (
    <div className="login-form slideDown">
      <form onSubmit={handleLogin} method="post">
        <div className="text-center mb-3">
          <h4>Login</h4>
        </div>{" "}
        <br />
        <div className="form-group">
          <label> Email or username</label>
          <input
            type="text"
            name="email"
            onChange={(e) => setUserID(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label> Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={(e) => setUserPass(e.target.value)}
            required
          />
        </div>
        <input
          className="btn btn-info w-100"
          type="submit"
          name="submit"
          value="Submit"
          required
        />
      </form>
    </div>
  );
}

export default LogIn;
