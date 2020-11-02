import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';

import SignUp from './signup.js';

function Home() {

  const history = useHistory();

  const goToSignup = () => {
    history.push("/signup");
  }

  return (
    <div className="row">
      <div className="col">
        <h1> Welcome to Portfal.io</h1>
        <h2> Showcase your skills </h2>

        <br /><br /><br />

        <button onClick={goToSignup}>Sign Up Now!</button>
      </div>
    </div>
  );
}

export default Home;