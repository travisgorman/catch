import h from './helpers'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Navigation, History } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import StorePicker from './components/StorePicker'
import NotFound from './components/NotFound'

let routes = (  
  <Router 
  	history={createBrowserHistory()} >
  	<Route path="/" component={StorePicker} />
  	<Route path="/store/:storeId" component={App} />
  	<Route path="*" component={NotFound} />
  </Router>
)

ReactDOM.render(  
  routes,
  document.querySelector('#main')
);