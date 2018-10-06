import React from "react";
import { Route, Switch } from "react-router-dom";
import Gallery from './Gallery'
import MyRestaurants from './MyRestaurants'
import Login from './Login'

export default () =>
  <Switch>
    <Route path="/" exact component={Gallery} />
    <Route path="/login" exact component={Login} />
	<Route path="/MyRestaurants" exact component={MyRestaurants} />
  </Switch>;