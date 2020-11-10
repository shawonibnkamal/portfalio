import React, { useState } from 'react';
import axios from 'axios';

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
    <div className="border border-black m-3 p-3 clearfix">
      <form onSubmit={handleSave} method="post">
        <div className="float-left">
          <label> Portfolio Image</label> <br />
          <img className="bg-secondary m-3" src={userPortfolios.profile_pic} alt="portfolio pic" width="400" height="400" /> <br />

          <input type="file" name="portfolio_pic_image" accept=".png, .jpg" onChange={e => setPortfolioPicture(e.target.value)} /> <br />

        </div>

        <br /><br /><br />

        <label> Name </label> <br />
        <input type="text" name="name" placeholder={userPortfolios.name} onChange={e => setPortfolioName(e.target.value)} /> <br />

        <label> URL </label> <br />
        <input type="text" name="url" placeholder={userPortfolios.url} onChange={e => setPortfolioURL(e.target.value)} /> <br />

        <label> Description </label> <br />
        <textarea type="text" name="description" placeholder={userPortfolios.description} onChange={e => setPortfolioDescription(e.target.value)} /> <br /><br />

        <input className="btn btn-info" type="submit" name="submit" value="Save" />
      </form>
      <br />
      <button className="btn btn-warning" onClick={handleDeletePortfolio}>Delete Portfolio</button>
    </div>
  );
}

export default DashboardPortfolios;