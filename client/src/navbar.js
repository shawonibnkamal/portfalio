import React, { useEffect, useState } from 'react';
import axios from 'axios'

function NavBar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState();
  const [userPass, setUserPass] = useState();

  const handleLogin = (e) => {
    e.preventDefault();
    //send data to server and recieve token
    axios.post("http://localhost:8000/api/user/login", {"email": userEmail, "password": userPass}).then(
      res => {
        //console.log("loggin in with token> " + res.data.login_token);
        localStorage.setItem("login_token", res.data.login_token);

        setLoggedIn(true);
      }
    ).catch( error => console.log(error.response.data));

  }

  const handleLogout = (e) => {
    //console.log("Bearer " + localStorage.getItem("login_token"));

    axios.post("http://localhost:8000/api/user/logout", {} , {
      headers: {
        "authorization": "Bearer " + localStorage.getItem("login_token")
    }}).then(
      res => {
        //console.log("logging out token> " + localStorage.getItem("login_token"));
        //console.log(res.data);
        localStorage.removeItem("login_token");
        //console.log("after remove token> " + localStorage.getItem("login_token"));

        setLoggedIn(false);
      }
    ).catch( error => console.log(error.response.data));
  }

  return (
    <div className="navbar mr-auto ">
      <ul className="nav">
        <li className="nav-item"> <a className="nav-link" href="#">Home</a> </li>
      </ul>
      <div className="navbar-nav mr-right">
        { loggedIn ? (
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <form onSubmit={handleLogin} method="post">
            <label> Login Form </label> <br/><br/>
            <label> Email: </label> <br/>
            <input type="text" name="email" onChange={e => setUserEmail(e.target.value)}/> <br/>
            <label> Password: </label> <br/>
            <input type = "password" name = "password"  onChange={e => setUserPass(e.target.value)}/> <br/><br/>
            <input type = "submit" name = "submit" value = "Submit" />
          </form>
        )

        }


      </div>
    </div>
  );
}

export default NavBar;
