import React, { Component } from "react";
import MealsView from "./Meals.jsx";

/**
 * Import Images
 */

/**
 * Server and state updates
 */
import * as actions from "../../Actions/actions";
import { connect } from "react-redux";
import { USER } from "../../Actions/types";

class Meals extends Component {
  render() {
    return (
      <div className="meals">
        <div className="main-header">
          <p>Meals Available!</p>
          <div className="search-form">
            <input type="text" placeholder="search" />
            {/* <button>Search</button> */}
          </div>
        </div>
        <hr className="ruler" />
        <MealsView />
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(Meals);
