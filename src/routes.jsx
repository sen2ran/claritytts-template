import React from 'react';
import Layout from './Hoc/Layout.jsx'
import { Switch, Route, Redirect } from 'react-router-dom'

import Angular from './Pages/Angular.jsx'
import ReactJs from './Pages/React.jsx'
import Vue from './Pages/Vue.jsx'
import Svelte from './Pages/Svelte'
import Feature from './Pages/Feature';
import All from './Pages/All';
import Playground from './Pages/PlayGround';



const Routes = (props) => {
  console.log(props);
  return (
    <Layout>
      <Switch>
        {/* en */}
        <Route {...props} path="/" exact component={
          () => (
            <Redirect to="/all" />
          )
        } />

        <Route {...props} path="/all" exact component={All} />
        <Route {...props} path="/feature" exact component={Feature} />
        <Route {...props} path="/pg" exact component={Playground} />


        
        <Route {...props} path="/react" exact component={ReactJs} />
        <Route {...props} path="/angular" exact component={Angular} />
        <Route {...props} path="/vue" exact component={Vue} />
        <Route {...props} path="/svelte" exact component={Svelte} />

      </Switch>
    </Layout>
  )
}

export default Routes;