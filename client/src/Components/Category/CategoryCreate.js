import React, { Component } from "react";
import form from "../../assets/svg/form.svg";

export default class CategoryCreate extends Component {
  render() {
    return (
      <div>
        <div className="card-large">
          <div className="form">
            <div className="form-header">
              <img src={form} alt="form img" className="form-img" />
              <p>Create Category for the Meal!</p>
            </div>
            <div className="form-body">
              <div className="input-group-create">
                <input type="text" name="name" placeholder="what category?" />
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
