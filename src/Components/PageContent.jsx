import React, { Fragment } from "react";

import DefaultCriterias from "./DefaultCriterias";
import OptionalCriterias from "./OptionalCriterias";
import MainButton from "./MainButton";

import { connect } from "react-redux";

const PageContent = props => {
  return (
    <Fragment>
      <h1>{props.heading}</h1>
      <hr />
      {props.isLoaded && <DefaultCriterias />}
      {props.isLoaded && props.OptionalCriteriasList.length > 0 && (
        <OptionalCriterias />
      )}
      {props.isLoaded && <MainButton />}
    </Fragment>
  );
};

function mapStateToProps(state) {
  return {
    isLoaded: state.EditDetails.isLoaded,
    OptionalCriteriasList: state.Criteria.optionalCriteriasList
  };
}

export default connect(mapStateToProps, null)(PageContent);
