import React, { Component } from "react";
import Menuview from "./Menuview";

export default class Menu extends Component {
  render() {
    return (
      <div className="meals">
        <div className="main-header">
          <p>Menu for Today!</p>
          <div className="search-form">
            <input type="text" placeholder="search" />
            {/* <button>Search</button> */}
          </div>
        </div>
        <hr className="ruler" />
        <Menuview />
      </div>
    );
  }
}
