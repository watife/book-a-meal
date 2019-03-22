import React, { Component } from "react";

import form from "../../assets/svg/form.svg";

import "./meal.css";

export default class MealCreate extends Component {
  render() {
    return (
      <div>
        <div className="card-large">
          <div className="form">
            <div className="form-header">
              <img src={form} alt="form img" className="form-img" />
              <p>Create awesome meal</p>
            </div>
            <div className="form-body">
              <div className="input-group-create">
                <input type="text" name="name" placeholder="Name Your Meal!" />
                <input type="text" placeholder="Price" />
              </div>
              <div className="input-group-create">
                <input type="text" placeholder="Size" />
                <input type="file" placeholder="choose meal image" />
              </div>
              <div className="input-group-create">
                <select>
                  <option value="">category 1</option>
                </select>
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
