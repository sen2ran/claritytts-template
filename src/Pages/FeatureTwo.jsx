import React, { Component } from "react";
import BaseLayout from "../Hoc/BaseLayout";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadCriteriaFn } from "../store/actions/CriteriaActions";

import PageContent from "../Components/PageContent";

class FeatureTwo extends Component {
  async componentDidMount() {
    this.props.loadCriteriaFn("supplier_pos_rules_criterias.json");
  }

  render() {
    return (
      <BaseLayout>
        <PageContent heading="Feature Two" />
      </BaseLayout>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadCriteriaFn }, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(FeatureTwo);
