import React, { useState } from 'react';
import axios from 'axios';

function DashboardUser({ userInfo }) {

  //states to store form data when changed
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicImage, setProfilePicImage] = useState();

  //form data to send to server with axios in handleSave
  var data = new FormData();
  data.append("_method", "PUT"); //need this because laravel don't understand put request -_-

  const handleSave = (e) => {
    e.preventDefault();

    if (username) {
      data.append("username", username);
    }

    if (email) {
      data.append("email", email);
    }

    if (firstName) {
      data.append("first_name", firstName);
    }

    if (lastName) {
      data.append("last_name", lastName);

    }

    if (password) {
      data.append("password", password);
    }

    if (profilePicImage) {
      data.append("profile_pic_image", profilePicImage);
    }

    //send data to server
    axios.post(process.env.REACT_APP_API_URL + "api/user/" + userInfo.id, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        "authorization": "Bearer " + localStorage.getItem("login_token")
      }
    }).then(
      res => {
        //console.log(res.data);
        window.location.reload();
      }
    ).catch(error => console.log(error.response.data));
  }

  return (
    <div className="border border-black">
      <form onSubmit={handleSave} method="post">
        <label> Profile Pic</label> <br />
        <img src="" alt="profile pic" width="500" height="500" /> <br />
        <input type="file" name="profile_pic_image" accept=".png, .jpg" onChange={e => setProfilePicImage(e.target.value)} /> <br />

        <label> Username</label> <br />
        <input type="text" name="username" placeholder={userInfo.username} onChange={e => setUsername(e.target.value)} /> <br />

        <label> Email</label> <br />
        <input type="text" name="email" placeholder={userInfo.email} onChange={e => setEmail(e.target.value)} /> <br />

        <label> First Name</label> <br />
        <input type="text" name="first_name" placeholder={userInfo.first_name} onChange={e => setFirstName(e.target.value)} /> <br />

        <label> Last Name</label> <br />
        <input type="text" name="last_name" placeholder={userInfo.last_name} onChange={e => setLastName(e.target.value)} /> <br />

        <label> Password</label> <br />
        <input type="password" name="password" placeholder="*****" onChange={e => setPassword(e.target.value)} /> <br />

        <input type="submit" name="submit" value="Save" />
      </form>
    </div>
  );
}

export default DashboardUser;