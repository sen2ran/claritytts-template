import React from 'react';
import Layout from './Hoc/Layout.jsx'
import { Switch, Route } from 'react-router-dom'

import SignIn from './Pages/SignIn.jsx'

import Enterprise from './Pages/Enterprise.jsx'
import Features from './Pages/Features.jsx'
import Pricing from './Pages/Pricing.jsx'
import Support from './Pages/Support.jsx'

const Routes = (props) => {
  console.log(props);
  return (
    <Layout>
      <Switch>
        <Route {...props} path="/sign-in" exact component={SignIn} />
        <Route {...props} path="/" exact component={Features} />
        <Route {...props} path="/home" exact component={Features} />
        <Route {...props} path="/enterprise" exact component={Enterprise} />
        <Route {...props} path="/features" exact component={Features} />
        <Route {...props} path="/pricing" exact component={Pricing} />
        <Route {...props} path="/support" exact component={Support} />
      </Switch>
    </Layout>
  )
}

export default Routes;