import React, { Component } from "react";
import CheckBox from "./Input/CheckBox";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CheckBoxCheckFn } from "../store/actions/CriteriaActions";

class OptionalCriteriasCheckBox extends Component {
  handleCheckboxChange = changeEvent => {
    const { name } = changeEvent.target;
    this.props.CheckBoxCheckFn(name)
  };

  createCheckboxFn = option => (
    <CheckBox
      label={option}
      isSelected={this.props.Criteria.selectedOptionalCriteriasList.includes(
        option
      )}
      onCheckboxChange={this.handleCheckboxChange}
      key={option}
    />
  );

  CreateCheckboxesFn = () => (
    <div className="row">
      {this.props.Criteria.optionalCriteriasList.map(this.createCheckboxFn)}
    </div>
  );

  render() {
    return (
      <div className="card">
        <div className="card-header">
          <h2>Optional Criterias Box</h2>
        </div>
        <div className="card-body">{this.CreateCheckboxesFn()}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    Criteria: state.Criteria
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ CheckBoxCheckFn }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OptionalCriteriasCheckBox);
