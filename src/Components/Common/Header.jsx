import React, { Component } from 'react';

import { getNavDetails } from "../../services/fakeUserService";

import { Link, withRouter } from 'react-router-dom'

class Header extends Component {
  state = {
    country: 'ru',
    navDetails: [
      {
        name: "React",
        linkTo: '/react'
      },
      {
        name: 'Angular',
        linkTo: '/angular'
      },
      {
        name: "Vue js",
        linkTo: '/vue'
      },
      {
        name: 'Svelte',
        linkTo: '/svelte'
      }
    ]
  }

  componentDidMount() {
    // const navDetails = getNavDetails("0001")
    // this.setState({
    //   navDetails: navDetails.navs
    // })
  }

  countryChangeFn(e) {
    // console.log(e);
    // alert(1)
    this.setState({
      country: e.target.value
    })

    // setCountry(e.target.value)
    // dispatch({
    //   type: 'CHANGE_LANG',
    //   lang: e.target.value
    // })

    // Router.push({
    //   pathname: '/' + e.target.value + '/' + router.pathname.split('/')[2],
    // })
  }

  LogoutFn() {
    localStorage.clear();
    this.props.history.push('/sign-in')
  }

  render() {
    const { navDetails, country } = this.state
    return (
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
        <h5 className="my-0 mr-md-auto font-weight-normal">Header</h5>

        <select value={country} onChange={(e) => this.countryChangeFn(e)}>
          <option value="en">En</option>
          <option value="ru">Ru</option>
        </select>
        <nav className="my-2 my-md-0 mr-md-3">
          {
            navDetails.map(navDetail =>
              <Link to={navDetail.linkTo} className="p-2 text-dark" key={navDetail.name} >{navDetail.name}</Link>
            )
          }
        </nav>
      </div>
    );
  }
}

export default withRouter(Header);