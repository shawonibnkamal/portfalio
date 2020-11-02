import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';

function LogIn({ loggedIn, setLoggedIn }) {
  const [userEmail, setUserEmail] = useState();
  const [userPass, setUserPass] = useState();
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    //send data to server and recieve token
    axios.post(process.env.REACT_APP_API_URL + "api/login", { "userID": userEmail, "password": userPass }).then(
      res => {
        //console.log("loggin in with token> " + res.data.login_token);
        localStorage.setItem("login_token", res.data.login_token);

        setLoggedIn(true);
        history.push("/");
      }
    ).catch(error => console.log(error.response.data));

  }

  return (
    <div>
      <form onSubmit={handleLogin} method="post">
        <label> <h4>Login Form</h4> </label> <br />
        <label> Email: </label> <br />
        <input type="text" name="email" onChange={e => setUserEmail(e.target.value)} /> <br />
        <label> Password: </label> <br />
        <input type="password" name="password" onChange={e => setUserPass(e.target.value)} /> <br /><br />
        <input type="submit" name="submit" value="Submit" />
      </form>
    </div>
  );
}

export default LogIn;