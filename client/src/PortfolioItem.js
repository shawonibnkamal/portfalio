import React from "react";

import defaultPortfolioPic from "./portfolio_placeholder.png";

function PortfolioGallery({ userPortfolio }) {
  return (
    <div className="col-4 portfolio-item-container">
      <div className="portfolio-item">
        <img
          data-toggle="modal"
          data-target="#myModal"
          className="thumbnail"
          src={
            userPortfolio.portfolio_pic
              ? userPortfolio.portfolio_pic
              : defaultPortfolioPic
          }
          alt="portfolio pic"
        />{" "}
        <div className="container py-3">
          Name: {userPortfolio.name} <br />
          Description: {userPortfolio.description}
          <br />
          URL: {userPortfolio.url}
        </div>
      </div>

      <div className="modal fade" id="myModal" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <img
                className="img-fluid w-100 h-100"
                src={
                  userPortfolio.profile_pic
                    ?  process.env.REACT_APP_API_URL + "storage/" +  userPortfolio.profile_pic
                    : defaultPortfolioPic
                }
                alt="portfolio pic"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PortfolioGallery;
