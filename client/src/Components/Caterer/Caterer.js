import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./caterer.css";

// Import the images
import avatar from "../../assets/svg/avatar.svg";
import tea from "../../assets/svg/tea.svg";
import cart from "../../assets/svg/cart.svg";

const Caterer = props => {
  return (
    <div className="admin">
      <div>
        <div className="container">
          <div className="user-admin__header">
            <div className="logo logo-admin">BookMyMeal</div>
            <div className="avatar">
              {/* <a href="caterer.html">
                <img src={avatar} alt className="admin-avatar" />
              </a> */}
              <Link to="/">
                <div className="signout">SignOut</div>{" "}
              </Link>
              <a href="billing.html">
                <img src={cart} alt="cart" className="cart-img" />
              </a>
            </div>
          </div>
          <main className="content">
            <aside className="sidebar">
              <nav className="navigation">
                <div className="nav-img__container">
                  <img src={tea} alt="nav image" className="nav-img" />
                  <p className="nav-img__text">
                    Create awesome Menu for today!
                  </p>
                </div>
                <hr className="ruler" />
                <div className="nav-unorder">
                  <div className="nav-link">
                    <div className="menu">Menu</div>
                    <div className="menu-list active">Today</div>
                    <div className="menu-list">History</div>
                  </div>
                  <div className="nav-link">Order History</div>
                  <div className="nav-link">Meals</div>
                  <div className="menu-list active">Add meal</div>
                  <div className="menu-list">All Meals</div>
                </div>
              </nav>
              <div className="legal">
                © 2019 by Boluwatife. All rights reserved.
              </div>
            </aside>
            <main className="main">
              <div className="main-header">
                <p>Spagetti</p>
              </div>
              <hr className="ruler" />
              <div className="main-dish">
                <div className="main-dish__title">Spagetti Native</div>
                <div className="main-dish__item">
                  <div className="main-dish__item--description">
                    <img
                      src="./assets/images/spaghetti.jpg"
                      alt="spagetti"
                      className="dish-item--img"
                    />
                    <div className="dish-item-desc">
                      <span>Spagetti &amp; Chicken</span>
                      <p>
                        Spagetti spiced with shrimp and chicken to go!... yaay!
                      </p>
                      <p>
                        A choice made by legends in the game, specially for you
                        and your own!
                      </p>
                    </div>
                    <div className="dish-item-price">
                      <span>$10.20</span>
                      <button className="add-btn">add</button>
                    </div>
                  </div>
                </div>
                <div className="main-dish__item">
                  <div className="main-dish__item--description">
                    <img
                      src="./assets/images/spaghetti.jpg"
                      alt="spagetti"
                      className="dish-item--img"
                    />
                    <div className="dish-item-desc">
                      <span>Spagetti &amp; Chiken Curry</span>
                      <p>
                        Spagetti spiced with curry sauce and chicken to go!...
                        great choice!
                      </p>
                      <p>
                        A choice made by legends in the game, specially for you
                        and your own!
                      </p>
                    </div>
                    <div className="dish-item-price">
                      <span>$10.20</span>
                      <button className="add-btn">add</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="main-dish">
                <div className="main-dish__title">Spagetti for Veggies</div>
                <div className="main-dish__item">
                  <div className="main-dish__item--description">
                    <img
                      src="./assets/images/spaghetti.jpg"
                      alt="spagetti"
                      className="dish-item--img"
                    />
                    <div className="dish-item-desc">
                      <span>Spagetti &amp; Chicken</span>
                      <p>
                        Spagetti spiced with shrimp and chicken to go!... yaay!
                      </p>
                      <p>
                        A choice made by legends in the game, specially for you
                        and your own!
                      </p>
                    </div>
                    <div className="dish-item-price">
                      <span>$10.20</span>
                      <button className="add-btn">add</button>
                    </div>
                  </div>
                </div>
                <div className="main-dish__item">
                  <div className="main-dish__item--description">
                    <img
                      src="./assets/images/spaghetti.jpg"
                      alt="spagetti"
                      className="dish-item--img"
                    />
                    <div className="dish-item-desc">
                      <span>Spagetti &amp; Chiken Curry</span>
                      <p>
                        Spagetti spiced with curry sauce and chicken to go!...
                        great choice!
                      </p>
                      <p>
                        A choice made by legends in the game, specially for you
                        and your own!
                      </p>
                    </div>
                    <div className="dish-item-price">
                      <span>$10.20</span>
                      <button className="add-btn">add</button>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </main>
        </div>
      </div>
    </div>
  );
};

Caterer.propTypes = {};

export default Caterer;
