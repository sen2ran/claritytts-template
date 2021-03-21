import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { changeLangFn } from "../../store/actions/index";
import { Link, withRouter } from "react-router-dom";

class Header extends Component {
  // countryChangeFn(e) {
  //   const { changeLangFn, history, location } = this.props;
  //   changeLangFn(e.target.value);
  //   history.push("/" + e.target.value + "/" + location.pathname.split("/")[2]);
  // }
  render() {
    const { navDetails } = this.props.header;
    return (
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
        <h5 className="my-0 mr-md-auto font-weight-normal">Header</h5>
        <nav className="my-2 my-md-0 mr-md-3">
          {navDetails.map(navDetail => (
            <Link
              to={navDetail.linkTo}
              className="p-2 text-dark"
              key={navDetail.name}
            >
              {navDetail.name}
            </Link>
          ))}
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    header: state.headerData
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeLangFn }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header));
