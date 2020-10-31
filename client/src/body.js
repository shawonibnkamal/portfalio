import React, { useState } from 'react';
import axios from 'axios'

function Body() {
    return (
        <div className="row">
            { localStorage.getItem("login_token") ?

            //if logged in
            <h1>dashboard</h1>
            :

            //if not logged in
                <div className="col">Use this site, it is good website</div>
            }
        </div>
    );
}

export default Body;