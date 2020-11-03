import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {

  const [userInfo, setUserInfo] = useState({});
  const [userPortfolios, setUserPortfolios] = useState([]);

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

        <div className="border border-black">
          <form>
            <label> Profile Pic</label> <br />
            <img src="" alt="profile pic" width="500" height="500" /> <br />
            <label> Username</label> <br />
            <input type="text" name="username" placeholder={userInfo.username} /> <br />
            <label> Email</label> <br />
            <input type="text" name="email" placeholder={userInfo.email} /> <br />
            <label> First Name</label> <br />
            <input type="text" name="first_name" placeholder={userInfo.first_name} /> <br />
            <label> Last Name</label> <br />
            <input type="text" name="last_name" placeholder={userInfo.last_name} /> <br />
            <label> Password</label> <br />
            <input type="password" name="password" placeholder="12345678" /> <br />
            <input type="submit" name="submit" value="Save" />
          </form>
        </div> <br />

        <div className="border border-black">
          {
            userPortfolios.map(data => {
              return(
                  <form key={data.id}>
                    <label> Portfolio Image</label> <br />
                    <img src="" alt="portfolio image" width="800" height="800" /> <br />
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