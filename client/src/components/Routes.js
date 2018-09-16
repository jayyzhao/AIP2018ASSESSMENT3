import React from "react";
import { Route, Switch } from "react-router-dom";
import Gallery from './Gallery'
import Login from './Login'

export default () =>
  <Switch>
    <Route path="/" exact component={Gallery} />
    <Route path="/login" exact component={Login} />
  </Switch>;