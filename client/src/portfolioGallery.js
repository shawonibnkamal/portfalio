import React from 'react';

import defaultPortfolioPic from './portfolio_placeholder.png'

function PortfolioGallery({ userPortfolio }) {

  return (
    <div className="border border-black col-4 m-2 p-2">
      <img className="img-fluid" src={userPortfolio.profile_pic ? userPortfolio.profile_pic : defaultPortfolioPic} alt="portfolio pic"  /> <br /><br />
      <p>
        Name: {userPortfolio.name} <br />
        Description: {userPortfolio.description}<br />
        URL: {userPortfolio.url}
      </p>
    </div>
  );
}

export default PortfolioGallery;