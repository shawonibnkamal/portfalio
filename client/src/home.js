import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import SignUp from "./signup.js";

function Home() {
  const history = useHistory();

  const goToSignup = () => {
    history.push("/signup");
  };

  return (
    <div className="row">
      <div className="col">
        <h1> Showcase your skills</h1>
        <h2> Build portfolio like a professional </h2>

        <br />
        <br />
        <br />

        <button onClick={goToSignup}>Sign Up Now!</button>
      </div>
    </div>
  );
}

export default Home;
