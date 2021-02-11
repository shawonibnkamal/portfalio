import React, { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import Animation from "./LottieControl";
import { Helmet } from "react-helmet";

function Home() {
  const history = useHistory();

  const goToSignup = () => {
    history.push("/signup");
  };

  const goToDemo = () => {
    history.push("/shawon");
  };

  return (
    <>
      <Helmet>
        <title>Portfal.io | Simplified Portfolio Builder</title>
        <meta
          name="description"
          content="Simplified portfolio builder for designers, engineers, software developers or any professional."
          data-react-helmet="true"
        />
      </Helmet>
      <div className="homeContainer slideDown">
        <div className="w-100">
          <h1 className="homeTitle"> Build portfolio like a professional </h1>
          <h2 className="homeTitle2">
            {" "}
            Simplified portfolio builder for anyone{" "}
          </h2>
          <button
            className="btn btn-default homeButton mb-2"
            onClick={goToSignup}
          >
            GET STARTED
          </button>{" "}
          <button
            className="btn btn-default homeButtonLight mb-2"
            onClick={goToDemo}
          >
            Demo
          </button>{" "}
          <br />
          Already signed up? <Link to="/login">Log in </Link>
          <div className="home-animation">
            <Animation />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
