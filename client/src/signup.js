import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';

function SignUp() {
  const [userFirstName, setUserFirstName] = useState();
  const [userLastName, setUserLastName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userPass, setUserPass] = useState();
  const history = useHistory();

  const handleSignup = (e) => {

    e.preventDefault();

    //send data to server and recieve token
    axios.post(process.env.REACT_APP_API_URL + "api/user",
      {
        "first_name": userFirstName,
        "last_name": userLastName,
        "email": userEmail,
        "password": userPass
      }).then(
        res => {
          //console.log("Signed up successfully");
          history.push("/login");
        }
      ).catch(error => console.log(error.response.data));

  }

  return (
    <div>
      <form className="col border rounded-lg bg-light text-dark" onSubmit={handleSignup} method="post">
        <label> <h4>Sign Up Form</h4> </label> <br /><br />
        <label> First Name: </label> <br />
        <input type="text" name="email" onChange={e => setUserFirstName(e.target.value)} /> <br />
        <label> Last Name: </label> <br />
        <input type="text" name="email" onChange={e => setUserLastName(e.target.value)} /> <br />
        <label> Email: </label> <br />
        <input type="text" name="email" onChange={e => setUserEmail(e.target.value)} /> <br />
        <label> Password: </label> <br />
        <input type="password" name="password" onChange={e => setUserPass(e.target.value)} /> <br /><br />
        <input type="submit" name="submit" value="Submit" />
      </form>
    </div>
  );
}

export default SignUp;