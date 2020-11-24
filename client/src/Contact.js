import React, { useState } from "react";
import axios from "axios";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    axios
      .post(process.env.REACT_APP_API_URL + "api/logout", {})
      .then((res) => {})
      .catch((error) => console.log(error.response.data));
  };

  return (
    <div className="login-form mt-3">
      <form onSubmit={handleSubmit} method="post">
        <div className="text-center mb-3">
          <h4>Contact</h4>
        </div>{" "}
        <br />
        <div className="form-group">
          <label> Name</label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label> Email</label>
          <input
            type="text"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label> Message</label>
          <textarea
            type="password"
            name="password"
            className="form-control"
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <input
          className="btn btn-info w-100"
          type="submit"
          name="submit"
          value="Submit"
          required
        />
      </form>
    </div>
  );
}

export default Contact;
