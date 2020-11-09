import React from "react";
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();

  const goToSignup = () => {
    history.push("/signup");
  };

  return (
    <div className="row">
      <div className="col text-center">
        <br />
        <br />
        <br />
        <br />
        <br />

        <h1> Showcase your skills</h1>
        <h2> Build portfolio like a professional </h2>

        <br />
        <br />
        <br />

        <button className="btn btn-info" onClick={goToSignup}>Sign Up Now!</button>
      </div>
    </div>
  );
}

export default Home;
