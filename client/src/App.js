import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Customers from './components/customers/customers';
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Banner from './components/Banner'
import Gallery from './components/Gallery'

class App extends Component {
  render() {
    return (
      <div className="container">
      <Navigation />
      <Banner />
      <Gallery />
      <Footer />
      </div>
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to React</h1>
      //   </header>
      //   <Customers />
      // </div>
    );
  }
}

export default App;
