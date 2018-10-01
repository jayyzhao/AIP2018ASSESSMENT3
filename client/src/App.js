import React, { Component } from 'react';
import './App.css';
import Routes from "./components/Routes";
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Banner from './components/Banner'
import Gallery from './components/Gallery'
import Bookings from './components/Bookings'
import WordGuesser from './components/WordGuesser'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Authentication from './components/Authentication';


class App extends Component {

  render() {
    return (
      <div className="container">
        <Navigation />
        <Banner />
        <Routes />
        <Footer />
      </div>
    );
  }
}

export default App;