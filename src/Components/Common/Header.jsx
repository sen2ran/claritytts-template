import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'

class Header extends Component {
  state = {
    country: 'en',
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
  }

  countryChangeFn(e) {
    this.setState({
      country: e.target.value
    })
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
              <Link to={`/${country}${navDetail.linkTo}`} className="p-2 text-dark" key={navDetail.name} >{navDetail.name}</Link>
            )
          }
        </nav>
      </div>
    );
  }
}

export default withRouter(Header);