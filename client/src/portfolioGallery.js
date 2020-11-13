import React from 'react';

import defaultPortfolioPic from './portfolio_placeholder.png'

function PortfolioGallery({ userPortfolio }) {

  return (
    <div className="border border-black col-4 m-2 p-2">

      <img data-toggle="modal" data-target="#myModal" className="img-fluid" src={userPortfolio.profile_pic ? userPortfolio.profile_pic : defaultPortfolioPic} alt="portfolio pic" /> <br /><br />
      <div className="modal fade" id="myModal" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
            <img className="img-fluid w-100 h-100" src={userPortfolio.profile_pic ? userPortfolio.profile_pic : defaultPortfolioPic} alt="portfolio pic" />
            </div>
            <div className="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      <p>
        Name: {userPortfolio.name} <br />
        Description: {userPortfolio.description}<br />
        URL: {userPortfolio.url}
      </p>
    </div>
  );
}

export default PortfolioGallery;