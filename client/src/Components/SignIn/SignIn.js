import React from "react";

import welcome from "../../assets/svg/welcome.svg";
import foodtruck from "../../assets/svg/truck.svg";

import { Link } from "react-router-dom";

const SignIn = () => {
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
                <label>Password</label>
                <input type="password" className="input-field" />
              </div>
              <p className="links">Forgot your password?</p>
              <button className="btn btn-signin">
                <a href="admin.html">Leggo!</a>
              </button>
              <p>
                Do not have an account?
                <span className="links">
                  <Link to="/">Register</Link>
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

export default SignIn;
