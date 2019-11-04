import React from "react";
import { connect } from "react-redux";
import CriteriaLoader from "./CriteriaLoader";

const DefaultCriterias = (props) => {
  const { defaultCriteriasList } = props.Criteria;
  return (
    <div className="card">
      <div className="card-header">
        <h2>DefaultCriterias</h2>
      </div>
      <div className="card-body">
        {defaultCriteriasList ? (
          <CriteriaLoader CriteriasList={defaultCriteriasList} />
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
)(DefaultCriterias);
