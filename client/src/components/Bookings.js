import React, { Component } from 'react';
import ReactTable from "react-table";
import decode from 'jwt-decode';
import Authentication from './Authentication';
import Moment from 'react-moment'
import 'moment-timezone';
import Modal from 'react-modal';
import Datetime from 'react-datetime';

const customStyles = {
    content : {
      height             : '80%',
      width              : '80%',
      top                : '50%',
      left               : '50%',
      right              : 'auto',
      bottom             : 'auto',
      marginRight        : '-50%',
      transform          : 'translate(-50%, -50%)'
    }
  };
  
  const buttonStyles = {
        color:'white',
        width:'20%',
        position:'absolute',
        left:'230px',
        bottom:'10px',
        height:'50px',
        backgroundColor:'steelblue'
  };
  
  const headStyles = {
    color:'white',
    textAlign:'center',
    width:'100%',
    position:'absolute',
    top:'0',
    right:'0',
    left:'0',
    height:'50px',
    backgroundColor:'steelblue'
  };
  
  const textStyles = {
    textAlign:'center',
    textStyles:'bold',
    fontSize:'20px',
    color:'steelblue',
    fontFamily:'Arial,Verdana,Sans-serif',
    position:'absolute',
    top:'100px'
  };
  
  const nameStyles = {
    paddingLeft:'82px'
  };

class Bookings extends Component {
    constructor() {
        super();
        this.Auth = new Authentication();
        this.state = {
            data: [],
            user : [],
            USERS_FIRST_NAME: '',
            USERS_LAST_NAME: '',
            CONTACT_EMAIL: '',
            modalIsOpen: false,
            bookingCanceled: false,
            bookingCanceledText: '',
            USERS_ID: '',
            pax: '',
            resturantName: '',
            date: '',
            BOOKING_ID: '',
            orderFood: false,
            menu: [],
            meal:[{mealID: '', mealQty: ''}]
        };
        this.openModal = this.openModal.bind(this);
        this.openFood = this.openFood.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.closeFood = this.closeFood.bind(this);
        this.cancelBooking = this.cancelBooking.bind(this);
        this.handleDateTimeChange = this.handleDateTimeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleFood = this.handleFood.bind(this);
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
        CONTACT_EMAIL: decode(localStorage.getItem('id_token')).CONTACT_EMAIL,
        USERS_ID: decode(localStorage.getItem('id_token')).USERS_ID
        });
        
        this.Auth.fetch('/user/bookings', {
            method: 'POST',
            body: JSON.stringify({UserID: decode(localStorage.getItem('id_token')).USERS_ID})
        }).then(res =>{
            this.setState({data : res, })
            console.log(res);
            
          })
        .catch(err =>{
            console.log(err);
              
        })

    }
    }

        openModal(booking) {

            this.setState({
                modalIsOpen: true,
                pax: booking.BOOKING_COUNT_PEOPLE,
                date: new Date(booking.BOOKING_DATE_AND_TIME),
                resturantName: booking.RESTAURANT_NAME,
                BOOKING_ID: booking.BOOKING_ID
            });
            console.log(this.state.date)
        }

        openFood(booking) {

            this.Auth.fetch('/user/booking/menu', {
                method: 'POST',
                body: JSON.stringify(booking)
            }).then(res =>{
                console.log(res);
                this.setState({
                    orderFood: true,
                    resturantName: booking.RESTAURANT_NAME,
                    menu: res
                })
              })
            .catch(err =>{
                  alert(err);
            })

        }

        closeFood() {
            this.setState({
                orderFood: false
            });
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

        handleEdit(event) {
            //Edit functionality
            event.preventDefault()
            console.log("EDIT");
          }
        // handelFood(event){

        // }
        
          handleDateTimeChange(event) {
            this.setState({
              date: event,
            });
          }

          handleUserInput (e) {
            const name = e.target.name;
            const value = e.target.value;
            this.setState({[name]: value});
              // () => { this.validateField(name, value) });
            this.setState({valuesChanged: true});
            console.log(this.state.menu)
          }

        handleSubmit(e){
        var options = this.state;
        this.Auth.fetch('/user/bookings/modify', {
                method: 'POST',
                body: JSON.stringify({options})
        }).then(res =>{
            console.log(res)
            this.setState({
                modalIsOpen: false,
                data : res
            })
            })
            .catch(err =>{
                alert(err);
            })
    
        e.preventDefault();
    
        }

    render() {
        var getValidTimes = function() {
            return {
              hours: {
                min: 9,
                max: 22,
                step: 1,
              },
              minutes: {
                min: 0,
                max: 59,
                step: 15,
              },
            };
          }

          var valid = function( current ){
            var yesterday  = new Date();
            yesterday.setDate(yesterday.getDate()-1);
            return current.isAfter(yesterday);
          };

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
        if (!data.length) {
            return <h1>No Bookings Avaliable</h1>
          }
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
                            accessor: "RESTAURANT_NAME",
                            width:150
                            },
                            {
                            Header: "PAX",
                            accessor: "BOOKING_COUNT_PEOPLE",
                            width: 50
                            },
                            {
                            Header: "Booking Date & Time",
                            accessor: "BOOKING_DATE_AND_TIME",
                            Cell: props => props.original.BOOKING_DATE_AND_TIME  ? <Moment>{props.original.BOOKING_DATE_AND_TIME}</Moment> : null,
                            width: 300
                            },
                            {
                            Header: "Booking Status",
                            accessor: "BOOKING_IS_ACTIVE",
                            Cell: props => props.original.BOOKING_IS_ACTIVE  ? "Active" : "Cancelled",
                            width: 130
                            },
                            {
                            Header: "Action",
                            Cell: props => props.original.BOOKING_IS_ACTIVE  ? <div>
                                {/* <button className="btn btn-sm btn-success" type="button" onClick={() => this.openFood(props.original)}>Order Food!</button>  */}
                                <button className="btn btn-sm btn-info" type="button" onClick={() => this.openModal(props.original)} >Edit Booking</button> 
                                <button className="btn btn-sm btn-danger" type="button" onClick={() => this.cancelBooking(props.original)}>Cancel Booking!</button> </div> 
                                : "No Actions Avaliable",
                            width: 360
                            }
                        ]
                        }
                    ]}
                    defaultPageSize={10}
                    className="-striped -highlight"
                    noDataText={'No rows found'}
                />

            <Modal style={customStyles}
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}>
                <h1 style={headStyles}>{this.state.resturantName}</h1>
                <br/><br/>
                <form className="bookTable" onSubmit={this.handleSubmit}>
                  <h2>Modify your Booking!</h2>
                  {/* {passwordValid} */}                  
                  <div className="form-group">
                  <div className="form-group">
                    <label>Please Pick Date and Time</label>
                    <Datetime 
                      closeOnSelect = "true"
                      viewMode="days"
                      closeOnTab="true"
                      timeConstraints={getValidTimes()}
                      value= { this.state.date }
                      isValidDate={ valid }
                      onChange={ this.handleDateTimeChange }
                      dateFormat="DD/MM/YYYY "
                    />
                  </div>
                    <label htmlFor="email">First Name</label>
                    <input 
                      type="text" 
                      className="form-control"
                      name="USERS_FIRST_NAME" 
                      value={this.state.USERS_FIRST_NAME} 
                      onChange={(event) => this.handleUserInput(event)}
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Last Name</label>
                    <input 
                      type="text" 
                      className="form-control"
                      name="USERS_LAST_NAME" 
                      value={this.state.USERS_LAST_NAME} 
                      onChange={(event) => this.handleUserInput(event)}
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                      type="email" 
                      className="form-control"
                      name="CONTACT_EMAIL" 
                      value={this.state.CONTACT_EMAIL} 
                      onChange={(event) => this.handleUserInput(event)}
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Number of People</label>
                    <input 
                      type="number" 
                      className="form-control"
                      name="pax" 
                      max={10}
                      value={this.state.pax} 
                      onChange={(event) => this.handleUserInput(event)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" 
                    // disabled={!this.state.formValid}
                    >Change Booking Time!</button>
                </form>
            </Modal>

            {/* <Modal style={customStyles}
                isOpen={this.state.orderFood}
                onRequestClose={this.closeFood}>
                <h1 style={headStyles}>{this.state.resturantName}</h1>
                <br/><br/>
                <form className="bookTable" onSubmit={this.handleSubmit}>
                  <h2>Order Your Food!</h2>
                  {this.state.menu.map(meal => 
                    <div className="form-group">
                    <label htmlFor="email">{meal.MEAL_NAME} - ${meal.MEAL_UNIT_PRICE}</label>
                        <input 
                        type="number" 
                        className="form-control"
                        name='meal[]'
                        max={10}
                        value={this.state.menu.qty} 
                        onChange={(event) => this.hadleFood(event)}
                        />
                    </div>
                  )}                                    
                  <button type="submit" className="btn btn-primary" 
                    // disabled={!this.state.formValid}
                    >Order!</button>
                </form>
            </Modal> */}
            </div>
        );
    }
    }
  }
}
export default Bookings;
