import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, Route } from "react-router-dom";

/**
 * Dashboard Routes
 */
import dashboardMain from "../../Routes/dashboardMain";

/**
 * Import Images
 */
import tea from "../../assets/svg/tea.svg";

/**
 * Server and state updates
 */
import * as actions from "../../Actions/actions";
import { connect } from "react-redux";
import { USER } from "../../Actions/types";

/**
 * Import css
 */
import "./caterer.css";

class Caterer extends Component {
  state = {
    activeNav: "",
    activeDropDown: "Today"
  };

  activeNavChange = nav => {
    this.setState({ activeNav: nav });
  };

  activeDropDownChange = nav => {
    this.setState({ activeDropDown: nav });
  };

  componentDidMount() {
    this.props.actionFake(USER);
  }

  render() {
    const { activeNav, activeDropDown } = this.state;
    const selected = "menu s-active";
    const nonSelected = "menu";
    const one = "menu-list active";
    const none = "menu-list";
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
                {/* <a href="billing.html">
                  <img src={cart} alt="cart" className="cart-img" />
                </a> */}
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
                      <div
                        onClick={() => this.activeNavChange("Menu")}
                        className={
                          activeNav === "Menu" ? selected : nonSelected
                        }
                      >
                        Menu
                      </div>
                      <div
                        style={{
                          display: activeNav === "Menu" ? "inherit" : "none"
                        }}
                      >
                        <Link to="/caterer/menu">
                          <div className="menu-list">Today</div>
                        </Link>
                        <Link to="/caterer/menu/create">
                          <div className="menu-list">Add Meal</div>
                        </Link>
                        {/* <div className="menu-list">History</div> */}
                      </div>
                    </div>
                    <div className="nav-link">
                      <div
                        onClick={() => this.activeNavChange("Meal")}
                        className={
                          activeNav === "Meal" ? selected : nonSelected
                        }
                      >
                        Meal
                      </div>

                      <div
                        style={{
                          display: activeNav === "Meal" ? "inherit" : "none"
                        }}
                      >
                        <Link to="/caterer/meal/create">
                          <div className="menu-list">Create</div>
                        </Link>

                        <Link to="/caterer/category/create">
                          <div className="menu-list">Add Category</div>
                        </Link>
                        <Link to="/caterer/meals">
                          <div className="menu-list">All Meals</div>
                        </Link>
                      </div>
                    </div>
                    <div className="nav-link">
                      <div
                        onClick={() => this.activeNavChange("Order")}
                        className={
                          activeNav === "Order" ? selected : nonSelected
                        }
                      >
                        Order
                      </div>
                    </div>
                  </div>
                </nav>
                <div className="legal">
                  © 2019 by Boluwatife. All rights reserved.
                </div>
              </aside>
              {/*
               * Render the main part of the dashboard here
               */}
              <main className="main">
                {dashboardMain.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.main}
                  />
                ))}
              </main>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(Caterer);
