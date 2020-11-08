import React, { useState } from 'react';

function UserPortfolio( {username} ) {
  return (
    <div className="row">
      <div className="col">
        <h1>{username}</h1>
      </div>
    </div>
  );
}

export default UserPortfolio;