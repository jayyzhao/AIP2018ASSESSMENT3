import React, { Component } from 'react';

class Bookings extends Component {
  render() {
    const newBooking = this.props.newBooking;

    if(newBooking){
        return (
            <div>
              <h1>New Bookings</h1>
            </div>
        );
    }
    else{
        return(
            <div>
                <h1>Show My Bookings</h1>
            </div>
        );
    }
  }
}
export default Bookings;
