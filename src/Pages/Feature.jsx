import React, { Component } from "react";
import BaseLayout from "../Hoc/BaseLayout";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadCriteriaFn } from "../store/actions/CriteriaActions";
import { loadEditDetailsFn, resetState } from "../store/actions/EditAction";

import PageContent from "../Components/PageContent";

class Feature extends Component {
  async componentDidMount() {
    this.props.resetState();
    this.props.loadCriteriaFn("supplier_airline_blocking_rule_criterias.json");
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    this.props.loadEditDetailsFn({
      id: id
    });
  }

  render() {
    return (
      <BaseLayout>
        <PageContent heading="Feature" />
      </BaseLayout>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { loadCriteriaFn, loadEditDetailsFn, resetState },
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(Feature);
