import React, { useState, useLayoutEffect, useRef } from "react";
import axios from "axios";
import defaultPortfolioPic from "./portfolio_placeholder.png";

function DashboardPortfolioForm({ userPortfolios, trigger, setTrigger }) {
  //states to store form data when changed
  const [portfolioName, setPortfolioName] = useState(
    userPortfolios.name ? userPortfolios.name : ""
  );
  const [portfolioURL, setPortfolioURL] = useState(
    userPortfolios.url ? userPortfolios.url : ""
  );
  const [portfolioDescription, setPortfolioDescription] = useState(
    userPortfolios.description ? userPortfolios.description : ""
  );
  const [portfolioPicture, setPortfolioPicture] = useState();

  //form data to send to server with axios in handleSave
  var data = new FormData();
  data.append("_method", "PUT"); //need this because laravel don't understand put request -_-

  const handleSave = (e) => {
    e.preventDefault();

    data.append("id", userPortfolios.id);

    if (portfolioName) {
      data.append("name", portfolioName);
    }

    if (portfolioURL) {
      data.append("url", portfolioURL);
    }

    if (portfolioDescription) {
      data.append("description", portfolioDescription);
    }

    if (portfolioPicture) {
      data.append("portfolio_pic_image", portfolioPicture);
    }

    //send data to server
    axios
      .post(
        process.env.REACT_APP_API_URL + "api/portfolio/" + userPortfolios.id,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: "Bearer " + localStorage.getItem("login_token"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        //window.location.reload();
        setTrigger(!trigger);
      })
      .catch((error) => console.log(error.response.data));
  };

  const handleDeletePortfolio = () => {
    var check = window.confirm(
      "Are you sure, you want to delete this portfolio item? This is not reversible."
    );
    if (check) {
      //delete user
      console.log("Deleting portfolio item");
      axios
        .delete(
          process.env.REACT_APP_API_URL + "api/portfolio/" + userPortfolios.id,
          {
            headers: {
              authorization: "Bearer " + localStorage.getItem("login_token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setTrigger(!trigger);
        })
        .catch((error) => console.log(error.response.data));
    }
  };

  return (
    <div className="portfolio-form">
      <form onSubmit={handleSave} method="post">
        <div className="square mb-3">
          <img
            className="thumbnail"
            src={
              userPortfolios.portfolio_pic
                ? process.env.REACT_APP_API_URL +
                  "storage/" +
                  userPortfolios.portfolio_pic
                : defaultPortfolioPic
            }
            alt="portfolio pic"
          />
        </div>

        <div className="form-group">
          <input
            type="file"
            name="portfolio_pic_image"
            accept=".png, .jpg"
            onChange={(e) => setPortfolioPicture(e.target.files[0])}
          />
        </div>
        <div className="form-group">
          <label> Name </label> <br />
          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="Name"
            value={portfolioName}
            onChange={(e) => setPortfolioName(e.target.value)}
          />{" "}
        </div>
        <div className="form-group">
          <label> URL </label> <br />
          <input
            className="form-control"
            type="text"
            name="url"
            placeholder="URL"
            value={portfolioURL}
            onChange={(e) => setPortfolioURL(e.target.value)}
          />{" "}
        </div>
        <div className="form-group">
          <label> Description </label>
          <textarea
            className="form-control"
            type="text"
            name="description"
            placeholder="Description"
            value={portfolioDescription}
            rows="4"
            cols="50"
            onChange={(e) => setPortfolioDescription(e.target.value)}
          />{" "}
        </div>
        <div className="form-group">
          <input
            className="btn btn-primary mr-2"
            type="submit"
            name="submit"
            value="Save"
          />
          <button className="btn btn-danger" onClick={handleDeletePortfolio}>
            Delete Portfolio
          </button>
        </div>
      </form>
    </div>
  );
}

export default DashboardPortfolioForm;
