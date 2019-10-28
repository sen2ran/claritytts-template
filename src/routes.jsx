import React from 'react';
import Layout from './Hoc/Layout.jsx'
import { Switch, Route } from 'react-router-dom'

import SignIn from './Pages/SignIn.jsx'

import Angular from './Pages/Angular.jsx'
import ReactJs from './Pages/React.jsx'
import Vue from './Pages/Vue.jsx'
import Svelte from './Pages/Svelte'

const Routes = (props) => {
  console.log(props);
  return (
    <Layout>
      <Switch>
        {/* en */}
        <Route {...props} path="/" exact component={ReactJs} />
        <Route {...props} path="/react" exact component={ReactJs} />
        <Route {...props} path="/angular" exact component={Angular} />
        <Route {...props} path="/vue" exact component={Vue} />
        <Route {...props} path="/svelte" exact component={Svelte} />

        {/* en */}
        <Route {...props} path="/" exact component={ReactJs} />
        <Route {...props} path="/en/react" exact component={ReactJs} />
        <Route {...props} path="/en/angular" exact component={Angular} />
        <Route {...props} path="/en/vue" exact component={Vue} />
        <Route {...props} path="/en/svelte" exact component={Svelte} />

        {/* ru */}
        <Route {...props} path="/" exact component={ReactJs} />
        <Route {...props} path="/ru/react" exact component={ReactJs} />
        <Route {...props} path="/ru/angular" exact component={Angular} />
        <Route {...props} path="/ru/vue" exact component={Vue} />
        <Route {...props} path="/ru/svelte" exact component={Svelte} />
      </Switch>
    </Layout>
  )
}

export default Routes;