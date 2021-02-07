import React, { useState } from "react";
import axios from "axios";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const [response, setResponse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    var data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("comment", comment);

    axios
      .post(process.env.REACT_APP_API_URL + "api/contact", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.message != null) {
          setResponse("Message sent!");
        }
      })
      .catch((error) => console.log(error.response.data));
  };

  return (
    <div className="login-form mt-3 slideDown">
      <form onSubmit={handleSubmit} method="post">
        <div className="text-center mb-3">
          <h4>Contact</h4>
        </div>{" "}
        <br />
        <div className="form-group">
          <label> Name</label>
          <input
            type="text"
            name="name"
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
            type="comment"
            name="comment"
            className="form-control"
            onChange={(e) => setComment(e.target.value)}
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
        {response}
      </form>
    </div>
  );
}

export default Contact;
