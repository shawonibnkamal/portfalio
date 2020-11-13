import React, { useState } from 'react';
import axios from 'axios';
import defaultProfilePic from './profile_placeholder.png';

function DashboardUser({ userInfo, trigger, setTrigger }) {

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
        //window.location.reload();
        setTrigger(!trigger);
      }
    ).catch(error => console.log(error.response.data));
  }

  const handleDeleteAccount = () => {
    var check = window.confirm("Are you sure, you want to delete your account? This is not reversible.");
    if (check) {
      //delete user
      console.log("Deleting user");
      axios.delete(process.env.REACT_APP_API_URL + "api/user/" + userInfo.id, {
        headers: {
          "authorization": "Bearer " + localStorage.getItem("login_token")
        }
      }).then(
        res => {
          //console.log(res.data);
          localStorage.removeItem("login_token");

          window.location.reload();
        }
      ).catch(error => console.log(error.response.data));
    }
  }

  return (
    <div className="border border-black m-3 p-3">
      <form onSubmit={handleSave} method="post">
        <img className="img-fluid m-3 p-3" src={userInfo.profile_pic ? userInfo.profile_pic : defaultProfilePic} alt="profile pic" /> <br />
        <input type="file" name="profile_pic" accept=".png, .jpg" onChange={e => setProfilePicImage(e.target.value)} /> <br /><br />

        <label> Username:&nbsp;&nbsp;&nbsp; </label>
        <input className="form-control" type="text" name="username" placeholder={userInfo.username} onChange={e => setUsername(e.target.value)} /> <br /><br />

        <label> Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
        <input className="form-control" type="text" name="email" placeholder={userInfo.email} onChange={e => setEmail(e.target.value)} /> <br /><br />

        <label> First Name:&nbsp;&nbsp;&nbsp; </label>
        <input className="form-control" type="text" name="first_name" placeholder={userInfo.first_name} onChange={e => setFirstName(e.target.value)} /> <br /><br />

        <label> Last Name:&nbsp;&nbsp;&nbsp; </label>
        <input className="form-control" type="text" name="last_name" placeholder={userInfo.last_name} onChange={e => setLastName(e.target.value)} /> <br /><br />

        <label> Password:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
        <input className="form-control" type="password" name="password" placeholder="*****" onChange={e => setPassword(e.target.value)} /> <br /> <br />

        <input className="btn btn-info" type="submit" name="submit" value="Save" />
      </form>
      <br />
      <button className="btn btn-warning" onClick={handleDeleteAccount}>Delete Account</button>

    </div>
  );
}

export default DashboardUser;