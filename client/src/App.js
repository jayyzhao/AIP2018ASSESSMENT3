import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Banner from './components/Banner'
import Gallery from './components/Gallery'
import Bookings from './components/Bookings'
import WordGuesser from './components/WordGuesser'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
    <div className="container">
      {/* Include Navigation Component */}
      <Navigation />
      {/* Include Banner Component */}
      <Banner />
      {/* Initialize a Router to generate Path and Route dependencies */}
      <Router>
        <div>
        {/* Root Path - to show Gallery Component */}
        <Route exact path="/" component={Gallery}/>
        {/* Booking Path - for New Bookings */}
        <Route path="/Book" render={()=><Bookings newBooking={true}/>}/>
        {/* Path used to show Bookings */}
        <Route path="/showBookings" render={()=><Bookings newBooking={false}/>}/>
        <Route path="/checkWord" component={WordGuesser}/>
        </div>
      </Router> 
      <Footer />
    </div>
    );
  }
}

export default App;