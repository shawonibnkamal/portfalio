import React from 'react';

function PortfolioGallery({ userPortfolio }) {

  return (
    <div className="border border-black">
      <img src={userPortfolio.profile_pic} alt="portfolio pic" width="500" height="500" /> <br />
      <p>
        Name: {userPortfolio.name} <br />
        Description: {userPortfolio.description}<br />
        URL: {userPortfolio.url}
      </p>
    </div>
  );
}

export default PortfolioGallery;