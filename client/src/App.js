import React, { useState }  from 'react';
import axios from 'axios';
import NavBar from './navbar';
import Body from './body';
import Footer from './footer';

function App() {

  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("login_token") ? true : false);

  axios.post(process.env.REACT_APP_API_URL + "api/login/user", {} , {
    headers: {
      "authorization": "Bearer " + localStorage.getItem("login_token")
  }}).then(
    res => {
      console.log("login token valid");
    }
  ).catch(error => {
    console.log(error.response.data);
    localStorage.clear();
    setLoggedIn(false);
  });


  console.log("Welcome to Portfal.io");

  return (
    <div className="container-fluid">
      <NavBar className="row" loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Body className="row" loggedIn={loggedIn} />
      <Footer className="row" />
    </div>
  );
}

export default App;
