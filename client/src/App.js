import React, { useState }  from 'react';
import axios from 'axios';
import NavBar from './navbar';
import Body from './body';
import Footer from './footer';

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("login_token") ? true : false);

  return (
    <div className="container-fluid">
      <NavBar className="row" loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Body className="row" loggedIn={loggedIn} />
      <Footer className="row" />
    </div>
  );
}

export default App;
