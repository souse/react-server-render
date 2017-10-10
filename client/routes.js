import React from 'react'
import { Route, Switch } from 'react-router'

import Login from './components/Login'
import Person from './components/Person'

const RedirectWithStatus = ({ from, to, status }) => (
  <Route render={({ staticContext }) => {
    // there is no `staticContext` on the client, so
    // we need to guard against that here
    if (staticContext)
      staticContext.status = status
      return <Redirect from={from} to={to}/>
  }}/>
)

const Status = ({ code, children }) => (
  	<Route render={({ staticContext }) => {
    	if (staticContext)
      		staticContext.status = code
    		return children
  		}
  	}/>
)

const NotFound = () => (
  	<Status code={404}>
    	<div>
      		<h1>Sorry, can’t find that.</h1>
    	</div>
  	</Status>
)

const App = () => (
	<Switch>
		<Route path="/login" component={Login} />
		<Route path="/person" component={Person} />
		<Route component={NotFound} />
    <RedirectWithStatus status={301} from="/users" to="/profiles" />
    <RedirectWithStatus status={302} from="/courses" to="/dashboard" />
	</Switch>
)

export default App