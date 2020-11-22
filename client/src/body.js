import React from "react";
import Home from "./home.js";
import Dashboard from "./Dashboard.js";

function Body({ loggedIn }) {
  return (
    <div className="col">
      {loggedIn ? (
        //if logged in
        <Dashboard />
      ) : (
        //if not logged in
        <Home />
      )}
    </div>
  );
}

export default Body;
