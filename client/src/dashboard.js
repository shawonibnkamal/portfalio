import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardUser from './dashboardUser'
import DashboardPortfolios from './dashboardPortfolios'

function Dashboard() {

  //state to store user info from server
  const [userInfo, setUserInfo] = useState({});
  //state to store user portfolio from server
  const [userPortfolios, setUserPortfolios] = useState([]);

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
      }
    ).catch(error => console.log(error.response.data));
  }, []);

  //get portfolios belonging to logged in user from server
  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + "api/user/" + userInfo.username + "/portfolio").then(
      res => {
        //console.log(res.data.userPortfolios[1]);
        setUserPortfolios(res.data.userPortfolios[1]);
      }
    ).catch(error => console.log(error.response.data));
  }, [userInfo]);

  return (
    <div className="row">
      <div className="col">
        <h1> Dashboard </h1>

        <DashboardUser userInfo={userInfo} />
        <br />

        <div className="border border-black">
          {
            userPortfolios.map(data => {
              return (
                <DashboardPortfolios userPortfolios={data} key={data.id}/>
                );
            })
          }
        </div>
      </div>
    </div>
  );
}

export default Dashboard;