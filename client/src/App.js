import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Banner from './components/Banner'
import Gallery from './components/Gallery'
import Bookings from './components/Bookings'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
    <div className="container">
      <Navigation />
      <Banner />
      <Router>
        <div>
        <Route exact path="/" component={Gallery}/>
        <Route path="/Book" render={()=><Bookings newBooking={true}/>}/>
        <Route path="/showBookings" render={()=><Bookings newBooking={false}/>}/>
        </div>
      </Router> 
      <Footer />
    </div>
    );
  }
}

export default App;