import React from "react";
import "./signin.css";

import { Link } from "react-router-dom";

// import images
import welcome from "../../assets/svg/welcome.svg";
import foodtruck from "../../assets/svg/truck.svg";

const SignUp = () => {
  return (
    <div className="login">
      <div className="logo">BookMyMeal</div>
      <div className="user__login">
        <div className="user__login--card">
          <div className="card">
            <div className="welcome">
              <img src={welcome} alt="welcome" className="welcome" />
            </div>
            <main className="user__login--main">
              <div className="user__login--text">welcome, Let's Book!</div>
              <div className="input-group">
                <label>Email address</label>
                <input type="email" className="input-field" />
              </div>
              <br />
              <div className="input-group">
                <label>Username</label>
                <input type="text" className="input-field" />
              </div>
              <br />
              <div className="input-group">
                <label>Password</label>
                <input type="password" className="input-field" />
              </div>
              <p className="links">Forgot your password?</p>
              <button className="btn btn-signin">Register</button>
              <p>
                Already have an account?
                <span className="links">
                  <Link to="/login">Login</Link>
                </span>
              </p>
            </main>
          </div>
        </div>
        <div className="user__login">
          <img src={foodtruck} alt="food-truck" className="user__login--img" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
