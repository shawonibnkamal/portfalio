import React, { useState } from 'react';
import axios from 'axios';
import defaultPortfolioPic from './portfolio_placeholder.png'

function DashboardPortfolios({ userPortfolios, trigger, setTrigger }) {

  //states to store form data when changed
  const [portfolioName, setPortfolioName] = useState("");
  const [portfolioURL, setPortfolioURL] = useState("");
  const [portfolioDescription, setPortfolioDescription] = useState("");
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
    axios.post(process.env.REACT_APP_API_URL + "api/portfolio/" + userPortfolios.id, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        "authorization": "Bearer " + localStorage.getItem("login_token")
      }
    }).then(
      res => {
        console.log(res.data);
        //window.location.reload();
        setTrigger(!trigger);
      }
    ).catch(error => console.log(error.response.data));
  }

  const handleDeletePortfolio = () => {
    var check = window.confirm("Are you sure, you want to delete this portfolio item? This is not reversible.");
    if (check) {
      //delete user
      console.log("Deleting portfolio item");
      axios.delete(process.env.REACT_APP_API_URL + "api/portfolio/" + userPortfolios.id, {
        headers: {
          "authorization": "Bearer " + localStorage.getItem("login_token")
        }
      }).then(
        res => {
          console.log(res.data);
          setTrigger(!trigger);
        }
      ).catch(error => console.log(error.response.data));
    }
  }

  return (
    <div className="border border-black p-3">
      <form onSubmit={handleSave} method="post">
        <img className="img-fluid m-3 p-3 w-100" src={userPortfolios.profile_pic ? userPortfolios.profile_pic : defaultPortfolioPic} alt="portfolio pic" /> <br />
        <input type="file" name="portfolio_pic_image" accept=".png, .jpg" onChange={e => setPortfolioPicture(e.target.value)} /> <br />

        <br /><br /><br />

        <label> Name </label> <br />
        <input className="form-control" type="text" name="name" placeholder={userPortfolios.name} onChange={e => setPortfolioName(e.target.value)} /> <br /><br />

        <label> URL </label> <br />
        <input className="form-control" type="text" name="url" placeholder={userPortfolios.url} onChange={e => setPortfolioURL(e.target.value)} /> <br /><br />

        <label> Description </label> <br />
        <textarea className="form-control" type="text" name="description" placeholder={userPortfolios.description} rows="4" cols="50" onChange={e => setPortfolioDescription(e.target.value)} /> <br /><br />

        <input className="btn btn-info" type="submit" name="submit" value="Save" /> &nbsp;&nbsp;&nbsp;
        <button className="btn btn-warning" onClick={handleDeletePortfolio}>Delete Portfolio</button>
      </form>
    </div>
  );
}

export default DashboardPortfolios;