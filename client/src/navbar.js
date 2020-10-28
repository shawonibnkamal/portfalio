import React, { useEffect, useState } from 'react';
import axios from 'axios'

function NavBar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState();
  const [userPass, setUserPass] = useState();

  const handleLogin = (e) => {
    e.preventDefault();
    //send data to server and recieve token
    console.log(userEmail + " " + userPass);
    console.log(localStorage.getItem("tok") ? "a" : "b");
    //setLoggedIn(true);
  }

  return (
    <div className="navbar mr-auto ">
      <ul className="nav">
        <li className="nav-item"> <a className="nav-link" href="#">Home</a> </li>
      </ul>
      <div className="navbar-nav mr-right">
        { loggedIn ? ( 
          <div>LoggedIn</div>
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
