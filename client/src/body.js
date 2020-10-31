import React, { useState } from 'react';
import axios from 'axios';
import Home from './home.js';
import Dashboard from './dashboard.js';

function Body() {
    return (
        <div>
            { localStorage.getItem("login_token") ?

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