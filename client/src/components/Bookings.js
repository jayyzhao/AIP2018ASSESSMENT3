import React, { Component } from 'react';
import ReactTable from "react-table";
import decode from 'jwt-decode';
import Authentication from './Authentication';
import Moment from 'react-moment'
import 'moment-timezone';

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
            modalIsOpen: false,
            bookingCanceled: false,
            bookingCanceledText: ''
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.cancelBooking = this.cancelBooking.bind(this);
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

        openModal(booking) {

        }

        cancelBooking(booking) {
            this.Auth.fetch('/user/bookings/cancel', {
                method: 'POST',
                body: JSON.stringify(booking)
            }).then(res =>{
                console.log(res);
                this.setState({
                    data : res,
                    bookingCanceled: true,
                    bookingCanceledText: 'Your Booking has been Cancelled!'
                })
              })
            .catch(err =>{
                  alert(err);
            })
        }


        closeModal() {
            this.setState({
                modalIsOpen: false
            });
        }

    render() {
    const { data } = this.state;
    // Declare the property value that gets passed through
    const newBooking = this.props.newBooking;
    // Check if this is for a new Booking or not

    var cancelAlert = this.state.bookingCanceled ?  <div className="alert alert-success">{this.state.bookingCanceledText}</div> : null ;

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
                <br/>
                {cancelAlert}
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
                            accessor: "BOOKING_COUNT_PEOPLE",
                            width: 50
                            },
                            {
                            Header: "Booking Date & Time",
                            accessor: "BOOKING_DATE_AND_TIME",
                            Cell: props => props  ? <Moment format="ddd DD/MM/YYY HH:MM">{props.original.BOOKING_DATE_AND_TIME}</Moment> : "Cancelled"
                            },
                            {
                            Header: "Booking Status",
                            accessor: "BOOKING_IS_ACTIVE",
                            Cell: props => props.original.BOOKING_IS_ACTIVE  ? "Active" : "Cancelled",
                            width: 100
                            },
                            {
                            Header: "Action",
                            Cell: props => props.original.BOOKING_IS_ACTIVE  ? <div><button className="btn btn-sm btn-info" type="button" onClick={() => this.openModal(props.original)} >Edit Booking</button> <button className="btn btn-sm btn-danger" type="button" onClick={() => this.cancelBooking(props.original)}>Cancel Booking!</button></div>: "No action avaliable"
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
