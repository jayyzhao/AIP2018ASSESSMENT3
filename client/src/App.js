import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Customers from './components/customers/customers';
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Banner from './components/Banner'
import Gallery from './components/Gallery'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
    <div className="container">
      <Navigation />
      <Banner />
      <Router>
        <div>
        <Route exact path="/" component={Gallery}/>
        <Route path="/Book" />
        <Route path="/showBookings" />
        </div>
      </Router> 
      <Footer />
    </div>
    );
  }
}

export default App;