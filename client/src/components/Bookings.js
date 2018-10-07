import React, { Component } from 'react';
import ReactTable from "react-table";
import decode from 'jwt-decode';
import Authentication from './Authentication';


class Bookings extends Component {
    constructor() {
        super();
        this.Auth = new Authentication();
        this.state = {
            data: [{firstName: "HELLO"}],
            user : [],
            USERS_FIRST_NAME: '',
            USERS_LAST_NAME: '',
            CONTACT_EMAIL: '',
        };
      }

    componentWillMount() {
    if (!this.Auth.loggedIn()) {
        this.props.history.replace('/login')
    }
    else{
        this.setState({
        user: decode(localStorage.getItem('id_token')),
        USERS_FIRST_NAME: decode(localStorage.getItem('id_token')).USERS_FIRST_NAME,
        USERS_LAST_NAME: decode(localStorage.getItem('id_token')).USERS_LAST_NAME,
        CONTACT_EMAIL: decode(localStorage.getItem('id_token')).CONTACT_EMAIL
        });
        
        this.Auth.fetch('/user/bookings', {
            method: 'POST',
            body: JSON.stringify({UserID: decode(localStorage.getItem('id_token')).USERS_ID})
        }).then(res =>{
            console.log(res);
            this.setState({data : res})
          })
        .catch(err =>{
              alert(err);
        })

    }
    }

    render() {
    const { data } = this.state;
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
                <ReactTable
                    data={data}
                    columns={[
                        {
                        Header: "All Bookings",
                        columns: [
                            {
                            Header: "Resturant",
                            accessor: "RESTAURANT_NAME"
                            },
                            {
                            Header: "PAX",
                            accessor: "BOOKING_COUNT_PEOPLE"
                            },
                            {
                            Header: "Booking Date & Time",
                            accessor: "BOOKING_DATE_AND_TIME"
                            },
                            {
                            Header: "Booking Status",
                            accessor: "BOOKING_IS_ACTIVE",
                            Cell: props => props.original.BOOKING_IS_ACTIVE  ? "Active" : "Cancelled"
                            },
                            {
                            Header: "Action",
                            Cell: props => props.original.BOOKING_IS_ACTIVE  ? "Modify or Cancel Booking" : "No Action"
                            }
                        ]
                        }
                    ]}
                    defaultPageSize={10}
                    className="-striped -highlight"
                    />
            </div>
        );
    }
  }
}
export default Bookings;
