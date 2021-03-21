import React, { Component } from "react";
import BaseLayout from "../Hoc/BaseLayout";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadCriteriaFn } from "../store/actions/CriteriaActions";
import { loadEditDetailsFn, resetState } from "../store/actions/EditAction";

import PageContent from "../Components/PageContent";

class All extends Component {
  componentDidMount() {
    this.props.resetState();
    this.props.loadCriteriaFn("all_criterias.json");
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    this.props.loadEditDetailsFn({
      id: id
    });
  }

  render() {
    return (
      <BaseLayout>
        <PageContent heading="All"></PageContent>
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

export default connect(null, mapDispatchToProps)(All);
