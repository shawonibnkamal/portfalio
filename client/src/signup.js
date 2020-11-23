import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const history = useHistory();

  //used to prevent access to this page if user is logged in
  useEffect(() => {
    if (localStorage.getItem("login_token")) {
      history.push("/");
    }
  }, []);

  const handleSignup = (e) => {
    e.preventDefault();

    //send data to server and recieve token
    axios
      .post(process.env.REACT_APP_API_URL + "api/user", {
        first_name: userFirstName,
        last_name: userLastName,
        username: username,
        email: userEmail,
        password: userPass,
      })
      .then((res) => {
        //console.log("Signed up successfully");
        history.push("/login");
      })
      .catch((error) => {
        //console.log(error.response.data);
        alert("An error have occured. Please try different username."); //only bad username can return error from backend
      });
  };

  return (
    <div className="login-form slideDown">
      <form className="col text-dark" onSubmit={handleSignup} method="post">
        <div className="text-center">
          <h4>Sign Up</h4> <br />
        </div>
        <div className="form-group">
          <label> First Name &nbsp;</label>
          <input
            className="form-control"
            type="text"
            name="fname"
            onChange={(e) => setUserFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label> Last Name &nbsp;</label>
          <input
            className="form-control"
            type="text"
            name="lname"
            onChange={(e) => setUserLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label> Username &nbsp;&nbsp;</label>
          <input
            className="form-control"
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            className="form-control"
            type="text"
            name="email"
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label> Password: &nbsp;&nbsp;&nbsp;</label>
          <input
            className="form-control"
            type="password"
            name="password"
            onChange={(e) => setUserPass(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="w-100 btn btn-info"
            type="submit"
            name="submit"
            value="Submit"
          />
        </div>
      </form>
    </div>
  );
}

export default SignUp;
