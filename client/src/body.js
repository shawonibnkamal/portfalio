import React from "react";
import Home from "./home.js";
import Dashboard from "./dashboard.js";

function Body({ loggedIn }) {
  return (
    <>
      {loggedIn ? (
        //if logged in
        <Dashboard />
      ) : (
        //if not logged in
        <Home />
      )}
    </>
  );
}

export default Body;
