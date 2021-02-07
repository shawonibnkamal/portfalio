import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useHistory, Link } from "react-router-dom";
import PortfolioItem from "./PortfolioItem";
import defaultProfilePic from "./profile_placeholder.png";

function UserPortfolio({ usernameProp, livePreviewTrigger }) {
  const history = useHistory();
  //used to get username from url
  var currentLocation = useLocation();
  var username = usernameProp
    ? usernameProp
    : currentLocation.pathname.substring(1);

  //state to store user info from server
  const [userInfo, setUserInfo] = useState({});
  //state to store user portfolio from server
  const [userPortfolios, setUserPortfolios] = useState([]);

  useEffect(() => {
    if (username !== "") {
      axios
        .get(
          process.env.REACT_APP_API_URL + "api/user/" + username + "/portfolio"
        )
        .then((res) => {
          //console.log(res.data);
          setUserInfo(res.data.userPortfolios[0][0]);
          setUserPortfolios(res.data.userPortfolios[1]);
          document.title =
            res.data.userPortfolios[0][0].first_name +
            " " +
            res.data.userPortfolios[0][0].last_name +
            " | Portfal.io";
        })
        .catch((error) => {
          console.log(error.response.data);
          history.push("/");
        });
    }
  }, [usernameProp, livePreviewTrigger]);

  return (
    <div className="profile">
      <div className="container">
        <div className="profile-header">
          <img
            className="profile-pic"
            src={
              userInfo.profile_pic
                ? process.env.REACT_APP_API_URL +
                  "storage/" +
                  userInfo.profile_pic
                : defaultProfilePic
            }
            alt="profile pic"
          />
          <h1 className="profile-name">
            {userInfo.first_name} {userInfo.last_name}
          </h1>
        </div>

        <div className="row">
          {userPortfolios
            .slice(0)
            .reverse()
            .map((data) => {
              return <PortfolioItem userPortfolio={data} key={data.id} />;
            })}
        </div>
      </div>
      <div className="profile-footer">
        Powered by{" "}
        <Link to="/" className="text-monospace">
          portfal.io
        </Link>
      </div>
    </div>
  );
}

export default UserPortfolio;
