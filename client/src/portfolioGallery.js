import React from 'react';

function PortfolioGallery({ userPortfolio }) {

  return (
    <div className="border border-black col-4 m-2 p-2">
      <img src={userPortfolio.profile_pic} alt="portfolio pic" width="400" height="400" /> <br />
      <p>
        Name: {userPortfolio.name} <br />
        Description: {userPortfolio.description}<br />
        URL: {userPortfolio.url}
      </p>
    </div>
  );
}

export default PortfolioGallery;