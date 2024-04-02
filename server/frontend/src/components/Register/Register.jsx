import React, { useState } from "react";
import "./Register.css";
import user_icon from "../assets/person.png"
import email_icon from "../assets/email.png"
import password_icon from "../assets/password.png"
import close_icon from "../assets/close.png"

const Register = () => {
  const [userData, setUserData] = useState({
    userName: "",
    password: "",
    email: "",
    firstName: "",
    lastName: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const register_url = `${window.location.origin}/djangoapp/register`;

    try {
      const res = await fetch(register_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const json = await res.json();
      
      if (json.status) {
        sessionStorage.setItem('username', json.userName);
        window.location.href = window.location.origin;
      } else if (json.error === "Already Registered") {
        alert("The user with the same username is already registered");
        window.location.href = window.location.origin;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const goHome = () => {
    window.location.href = window.location.origin;
  };

  return (
    <div className="register_container" style={{ width: "50%" }}>
      <div className="header" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <span className="text" style={{ flexGrow: "1" }}>SignUp</span>
        <div style={{ display: "flex", flexDirection: "row", justifySelf: "end", alignSelf: "start" }}>
          <a href="/" onClick={goHome} style={{ justifyContent: "space-between", alignItems: "flex-end" }}>
            <img style={{ width: "1cm" }} src={close_icon} alt="X" />
          </a>
        </div>
        <hr />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input">
            <img src={user_icon} className="img_icon" alt='Username' />
            <input type="text" name="userName" placeholder="Username" className="input_field" onChange={handleChange} />
          </div>
          <div>
            <img src={user_icon} className="img_icon" alt='First Name' />
            <input type="text" name="firstName" placeholder="First Name" className="input_field" onChange={handleChange} />
          </div>
          <div>
            <img src={user_icon} className="img_icon" alt='Last Name' />
            <input type="text" name="lastName" placeholder="Last Name" className="input_field" onChange={handleChange} />
          </div>
          <div>
            <img src={email_icon} className="img_icon" alt='Email' />
            <input type="email" name="email" placeholder="Email" className="input_field" onChange={handleChange} />
          </div>
          <div className="input">
            <img src={password_icon} className="img_icon" alt='Password' />
            <input name="password" type="password" placeholder="Password" className="input_field" onChange={handleChange} />
          </div>
        </div>
        <div className="submit_panel">
          <input className="submit" type="submit" value="Register" />
        </div>
      </form>
    </div>
  );
};

export default Register;