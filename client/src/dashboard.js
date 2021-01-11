import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import DashboardPortfolioForm from "./DashboardPortfolioForm";
import Profile from "./Profile";

function Dashboard() {
  //state to store user info from server
  const [userInfo, setUserInfo] = useState({});
  //state to store user portfolio from server
  const [userPortfolios, setUserPortfolios] = useState([]);
  //state to trigger useEffect
  const userTrigger = false;
  const [portfolioTrigger, setPortfolioTrigger] = useState(false);
  const addPortfolioBtn = useRef(null);

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
    addPortfolioBtn.current.disabled = true;
    axios
      .post(
        process.env.REACT_APP_API_URL + "api/portfolio",
        {},
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("login_token"),
          },
        }
      )
      .then((res) => {
        //console.log(res.data);
        addPortfolioBtn.current.disabled = false;
        setPortfolioTrigger(!portfolioTrigger);
      })
      .catch((error) => {
        addPortfolioBtn.current.disabled = false;
        console.log(error.response.data);
      });
  };

  return (
    <div className="dashboard">
      <div className="container fluid">
        <div className="row">
          <div className="col">
            <div className="m-auto" style={{ maxWidth: 500 }}>
              <button
                className="btn btn-primary pr-3 pl-3"
                style={{ maxWidth: 500, width: "100%" }}
                onClick={addPortfolio}
                ref={addPortfolioBtn}
              >
                Add Portfolio
              </button>{" "}
              <br />
              <div>
                {userPortfolios
                  .slice(0)
                  .reverse()
                  .map((data) => {
                    return (
                      <DashboardPortfolioForm
                        userPortfolios={data}
                        trigger={portfolioTrigger}
                        setTrigger={setPortfolioTrigger}
                        key={data.id}
                      />
                    );
                  })}
              </div>
            </div>
          </div>

          <div className="col-4 mobile-preview-container">
            <div className="preview-fixed">
              <div className="mobile-preview">
                <div className="preview-unclickable">
                  <Profile
                    usernameProp={userInfo.username}
                    key={userInfo.username}
                    livePreviewTrigger={portfolioTrigger}
                  />
                </div>
              </div>

              <div className="profile-url">
                Url:{" "}
                <a href={"/" + userInfo.username} className="text-monospace">
                  {"https://portfal.io/" + userInfo.username}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
