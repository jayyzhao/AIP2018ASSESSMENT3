import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Customers from './components/customers/customers';
import Navigation from './components/Navigation'
class App extends Component {
  render() {
    return (
      <div className="container">
      <Navigation />
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
