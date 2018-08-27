import React, { Component } from 'react';

class Bookings extends Component {
  render() {
    // Declare the property value that gets passed through
    const newBooking = this.props.newBooking;
    // Check if this is for a new Booking or not
    if(newBooking){
        return (
            <div>
                <div className="bg-light"> 
                    <div className="row">
                        <div className="col-md-3">
                        </div>
                        <div className="col-md-6"> 
                            <br/>
                            <h1>New Booking</h1>
                            {/* Form for making a new Booking */}
                            <form>
                                <div className="form-group">
                                    <label>Resturant</label>
                                    <input type="text" className="form-control" id="Resturant" placeholder="Resturant"/>
                                </div>
                                <div className="form-group">
                                    <label>Time</label>
                                    <input type="text" className="form-control" id="Time" placeholder="Time"/>
                                </div>
                                <button type="submit" className="btn btn-default">Submit</button>
                            </form>
                            <br/><br/>
                        </div>
                        <div className="col-md-3">
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    //If not a new booking - return existing bookings
    else{
        return(
            <div>
                <h1>Show My Bookings</h1>
                Your Bookings Below:
                <br/><br/>
            </div>
        );
    }
  }
}
export default Bookings;
