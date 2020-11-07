import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardUser from './dashboardUser'
import DashboardPortfolios from './dashboardPortfolios'

function Dashboard() {

  //state to store user info from server
  const [userInfo, setUserInfo] = useState({});
  //state to store user portfolio from server
  const [userPortfolios, setUserPortfolios] = useState([]);
  //state to trigger useEffect
  const [userTrigger, setUserTrigger] = useState(false);
  const [portfolioTrigger, setPortfolioTrigger] = useState(false);

  //get logged in user info from server
  useEffect(() => {
    axios.post(process.env.REACT_APP_API_URL + "api/login/user", {}, {
      headers: {
        "authorization": "Bearer " + localStorage.getItem("login_token")
      }
    }).then(
      res => {
        //console.log(res.data.user_info);
        setUserInfo(res.data.user_info);
        setPortfolioTrigger(!portfolioTrigger);
      }
    ).catch(error => console.log(error.response.data));
  }, [userTrigger]);

  //get portfolios belonging to logged in user from server
  useEffect(() => {
    if (userInfo.username) {
      axios.get(process.env.REACT_APP_API_URL + "api/user/" + userInfo.username + "/portfolio").then(
        res => {
          console.log(res.data.userPortfolios[1]);
          setUserPortfolios(res.data.userPortfolios[1]);
        }
      ).catch(error => console.log(error.response.data));
    }

  }, [portfolioTrigger]);

  const addPortfolio = (e) => {
    e.preventDefault();

    axios.post(process.env.REACT_APP_API_URL + "api/portfolio",
      {
        "name": "new portfolio",
        "url": "new url here",
        "description": "new description here"
      },
      {
        headers: {
          "authorization": "Bearer " + localStorage.getItem("login_token")
        }
      }
    ).then(
      res => {
        //console.log(res.data);
      }
    ).catch(error => console.log(error.response.data));

    setPortfolioTrigger(!portfolioTrigger);
  }

  return (
    <div className="row">
      <div className="col">
        <h1> Dashboard </h1>

        <h2> User Settings </h2>
        <DashboardUser userInfo={userInfo} trigger={userTrigger} setTrigger={setUserTrigger} />
        <br />

        <h2> Portfolios </h2>

        <button onClick={addPortfolio}>Add Portfolio</button>

        <div className="border border-black">
          {
            userPortfolios.map(data => {
              return (
                <DashboardPortfolios userPortfolios={data} trigger={portfolioTrigger} setTrigger={setPortfolioTrigger} key={data.id} />
              );
            })
          }
        </div>
      </div>
    </div>
  );
}

export default Dashboard;