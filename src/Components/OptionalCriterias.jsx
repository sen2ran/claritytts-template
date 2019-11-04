import React, { Component } from "react";
import CriteriaLoader from "./CriteriaLoader";

class OptionalCriterias extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-header">
          <h2>OptionalCriterias</h2>
        </div>
        <div className="card-body">
          <CriteriaLoader CriteriasList={this.props.optionalCriteriasList} />
        </div>
      </div>
    );
  }
}

export default OptionalCriterias;
