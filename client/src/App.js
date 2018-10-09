import React, { Component } from 'react';
import './App.css';
import Routes from "./components/Routes";
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Banner from './components/Banner'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Authentication from './components/Authentication';
import decode from 'jwt-decode';
import "react-table/react-table.css";


class App extends Component {
  //App renders whole page and navigation can be changed when logged in ,use this to do a log out

  constructor(props){
    super();
    this.state = {
      user: [],
      loggedIn: false
    }
    this.Auth = new Authentication();
  }

  componentWillMount() {
    const token = localStorage.getItem('id_token');
    if(token){
      this.setState({loggedIn:true});
    }
  }

  render() {
    return (
      <div className="container">
        <Navigation  loggedIn={this.state.loggedIn} logOut={this.logOut} />
        <Banner />
        <Routes />
        <Footer />
      </div>
    );
  }
}

export default App;