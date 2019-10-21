import React, { Component } from 'react';

import { getNavDetails } from "../../services/fakeUserService";

import { Link, withRouter } from 'react-router-dom'

class Header extends Component {
  state = {
    // 
    navDetails: []
  }

  componentDidMount() {
    let user = JSON.parse(localStorage.getItem('user'));
    const navDetails = getNavDetails(user._id)
    console.log(navDetails);
    this.setState({
      navDetails: navDetails.navs
    })
  }

  LogoutFn() {
    localStorage.clear();
    this.props.history.push('/sign-in')
  }

  render() {
    const { navDetails } = this.state
    return (
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
        <h5 className="my-0 mr-md-auto font-weight-normal">Header</h5>
        <nav className="my-2 my-md-0 mr-md-3">
          {/* <Link to='/features' className="p-2 text-dark">Features</Link>
          <Link to='/enterprise' className="p-2 text-dark" >Enterprise</Link>
          <Link to='/support' className="p-2 text-dark" >Support</Link>
          <Link to='/pricing' className="p-2 text-dark" >Pricing</Link> */}
          {
            navDetails.map(navDetail => 
              <Link to={navDetail.linkTo} className="p-2 text-dark" key={navDetail.name} >{navDetail.name}</Link>
            )
          }
        </nav>
        <button className="btn btn-outline-primary" onClick={(event) => this.LogoutFn(event)}>Log out</button>
      </div>
    );
  }
}

export default withRouter(Header);