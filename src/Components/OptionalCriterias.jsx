import React from "react";
import { connect } from "react-redux";
import OptionalCriteriasCheckBox from "./OptionalCriteriasCheckBox";
import CriteriaLoader from "./CriteriaLoader";

const OptionalCriterias = (props) => {
  const { selectedOptionalCriteriasList } = props.Criteria;
  const { length } = selectedOptionalCriteriasList;

  return (
    <div className="card">
      <div className="card-header">
        <h2>OptionalCriterias</h2>
      </div>
      <div className="card-body">
        <OptionalCriteriasCheckBox />
        {length > 0 ? (
          <CriteriaLoader CriteriasList={selectedOptionalCriteriasList} />
        ) : null}
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    Criteria: state.Criteria
  };
}

export default connect(
  mapStateToProps,
  null
)(OptionalCriterias);
