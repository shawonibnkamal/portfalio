import React, { useState } from 'react';
import axios from 'axios';
import Home from './home.js';
import Dashboard from './dashboard.js';

function Body( {loggedIn} ) {

  return (
      <div>
        { loggedIn ?
          //if logged in
          <Dashboard/>
          :
          //if not logged in
          <Home />
        }
      </div>
    );
}

export default Body;