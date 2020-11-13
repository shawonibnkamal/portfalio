import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardUser from "./dashboardUser";
import DashboardPortfolios from "./dashboardPortfolios";
import UserPortfolio from "./Profile";

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
    axios
      .post(
        process.env.REACT_APP_API_URL + "api/login/user",
        {},
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("login_token"),
          },
        }
      )
      .then((res) => {
        //console.log(res.data.user_info);
        setUserInfo(res.data.user_info);
        setPortfolioTrigger(!portfolioTrigger);
      })
      .catch((error) => console.log(error.response.data));
  }, [userTrigger]);

  //get portfolios belonging to logged in user from server
  useEffect(() => {
    if (userInfo.username) {
      axios
        .get(
          process.env.REACT_APP_API_URL +
            "api/user/" +
            userInfo.username +
            "/portfolio"
        )
        .then((res) => {
          //console.log(res.data.userPortfolios[1]);
          setUserPortfolios(res.data.userPortfolios[1]);
        })
        .catch((error) => console.log(error.response.data));
    }
  }, [portfolioTrigger]);

  const addPortfolio = (e) => {
    e.preventDefault();

    axios
      .post(
        process.env.REACT_APP_API_URL + "api/portfolio",
        {
          name: "new portfolio",
          url: "new url here",
          description: "new description here",
        },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("login_token"),
          },
        }
      )
      .then((res) => {
        //console.log(res.data);
        setPortfolioTrigger(!portfolioTrigger);
      })
      .catch((error) => console.log(error.response.data));
  };

  return (
    <div className="row">
      <div className="col">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active"
              id="portfolio-tab"
              data-toggle="tab"
              href="#portfolio"
              role="tab"
              aria-controls="portfolio"
            >
              Portfolio Editor
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="account-tab"
              data-toggle="tab"
              href="#account"
              role="tab"
              aria-controls="account"
            >
              Account Settings
            </a>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active m-auto"
            id="portfolio"
            role="tabpanel"
            aria-labelledby="portfolio-tab"
            style={{ width: 500 }}
          >
            <button
              className="btn btn-primary mt-4 pr-3 pl-3"
              style={{ width: 500 }}
              onClick={addPortfolio}
            >
              Add Portfolio
            </button>{" "}
            <br />
            <br />
            <div>
              {userPortfolios.map((data) => {
                return (
                  <DashboardPortfolios
                    userPortfolios={data}
                    trigger={portfolioTrigger}
                    setTrigger={setPortfolioTrigger}
                    key={data.id}
                  />
                );
              })}
            </div>
          </div>

          <div
            className="tab-pane fade m-auto"
            id="account"
            role="tabpanel"
            aria-labelledby="account-tab"
            style={{ width: 500 }}
          >
            <DashboardUser
              userInfo={userInfo}
              trigger={userTrigger}
              setTrigger={setUserTrigger}
            />
            <br />
          </div>
        </div>
      </div>

      <div className="col-4">
        <div className="mobile-preview">
          <UserPortfolio
            usernameProp={userInfo.username}
            key={userInfo.username}
          />
        </div>

        <div className="text-monospace font-italic">
          {" "}
          <input
            className="profile-url form-control"
            value={"http://portfal.io/" + userInfo.username}
            readOnly
          ></input>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
