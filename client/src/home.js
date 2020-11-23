import React from "react";
import { useHistory, Link } from "react-router-dom";

function Home() {
  const history = useHistory();

  const goToSignup = () => {
    history.push("/signup");
  };

  return (
    <div className="homeContainer slideDown">
      <div>
        <h1 className="homeTitle"> Showcase your skills</h1>
        <h2 className="homeTitle2"> Build portfolio like a professional </h2>
        <button className="btn btn-info homeButton mb-2" onClick={goToSignup}>
          GET STARTED
        </button>{" "}
        <br />
        Already signed up? <Link to="/login">Log in </Link>
      </div>
    </div>
  );
}

export default Home;
