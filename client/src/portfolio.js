import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useHistory } from "react-router-dom";
import PortfolioGallery from './portfolioGallery';

function UserPortfolio() {
  const history = useHistory();
  //used to get username from url
  var currentLocation = useLocation();
  var username = currentLocation.pathname.substring(1);

  //state to store user info from server
  const [userInfo, setUserInfo] = useState({});
  //state to store user portfolio from server
  const [userPortfolios, setUserPortfolios] = useState([]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + "api/user/" + username + "/portfolio").then(
      res => {
        //console.log(res.data);
        setUserInfo(res.data.userPortfolios[0][0])
        setUserPortfolios(res.data.userPortfolios[1]);
      }
    ).catch(error => {
      console.log(error.response.data);
      history.push("/");
    });
  }, []);

  return (
    <div className="row">
      <div className="col text-center">
        <br/>
        <h2>Portfolio</h2>
        <img className="bg-dark" src={userInfo.profile_pic} alt="profile pic" width="400" height="400" /> <br />
        <p>
          Hi My name is {userInfo.first_name + " " + userInfo.last_name}
        </p>

        <div className="row">
          {
            userPortfolios.map(data => {
              return (
                <PortfolioGallery userPortfolio={data} key={data.id} />
              );
            })
          }
        </div>

        <br /><br />
        <a className="btn btn-outline-success" href={"mailto:" + userInfo.email}>Email: {userInfo.email}</a>

      </div>
    </div>
  );
}

export default UserPortfolio;