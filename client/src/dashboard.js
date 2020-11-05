import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardUser from './dashboardUser.js'

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
                <form key={data.id}>
                  <label> Portfolio Image</label> <br />
                  <img src="" alt="portfolio image" width="800" height="800" /> <br />
                  <input type="file" name="profile_pic_image" accept=".png, .jpg" /> <br />
                  <label> Name </label> <br />
                  <input type="text" name="name" placeholder={data.name} /> <br />
                  <label> URL </label> <br />
                  <input type="text" name="url" placeholder={data.url} /> <br />
                  <label> Description </label> <br />
                  <textarea type="text" name="description" placeholder="" /> <br />
                  <input type="submit" name="submit" value="Save" />
                </form>)
            })
          }
        </div>
      </div>
    </div>
  );
}

export default Dashboard;