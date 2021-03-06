import React from "react";
import { Route, Switch } from "react-router-dom";
import Gallery from './Gallery'
import MyRestaurants from './MyRestaurants'
import RestaurantBookings from './RestaurantBookings'
import signUp from './signUp'
import Bookings from './Bookings'
import Login from './Login'

export default () =>
  <Switch>
    {/*switching between routes defined*/}
    <Route path="/" exact component={Gallery} />
    <Route path="/login" exact component={Login} />
    <Route path="/Book" exact component={Bookings} />
	  <Route path="/MyRestaurants" exact component={MyRestaurants} />
	  <Route path="/RestaurantBookings" exact component={RestaurantBookings} />
    <Route path="/signUp" exact component={signUp} />
  
  </Switch>;