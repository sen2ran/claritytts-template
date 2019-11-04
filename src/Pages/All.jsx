import React, { Component } from "react";
import BaseLayout from "../Hoc/BaseLayout";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadCriteriaFn } from "../store/actions/CriteriaActions";
import DefaultCriterias from "../Components/DefaultCriterias";
// import { getCriterias } from "../services/Apicalls";

class All extends Component {
  state = {
    defaultCriteriasList: [],
    optionalCriteriasList: []
  };

  componentDidMount() {
    this.props.loadCriteriaFn("all_criterias.json");
  }

  render() {
    return (
      <BaseLayout>
        <h1>All</h1>
        <hr />
        <DefaultCriterias/>
      </BaseLayout>
    );
  }
}

function mapStateToProps(state) {
  return {
    Criteria: state.Criteria
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadCriteriaFn }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(All);
