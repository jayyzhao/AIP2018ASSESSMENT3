import React, { Component } from 'react';
import Modal from 'react-modal';
import Authentication from './Authentication';
import 'bootstrap/dist/css/bootstrap.min.css';
import decode from 'jwt-decode';
import Datetime from 'react-datetime';
import "./css/modalTransition.css";

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

const headStylesMenu = {
  color:'white',
  textAlign:'center',
  width:'100%',
  position:'absolute',
  top:'0',
  right:'0',
  left:'0',
  height:'50px',
  backgroundColor:'tomato'
};

const priceStyles = {
    width:"50px",
    height:"50px",
    borderRadius:"50%",
    fontSize:"25px",
    color:"white",
    lineHeight:"50px",
    float:"right",
    backgroundColor:"tomato",
};

export default class Gallery extends Component {
  
  constructor(props){
    super();
    this.Auth = new Authentication();
    this.state = {
      user : [],
      USERS_FIRST_NAME: '',
      USERS_LAST_NAME: '',
      CONTACT_EMAIL: '',
      USERS_ID: '',
      resturants: [],
      modalIsOpen: false,
      menuModalisOpen: false,
      resturantName: '',
      resturantID: '',
      pax: '',
      date: new Date(),
      booked: false,
      bookedText: '',
      menu: []
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.menuModal = this.menuModal.bind(this);
    this.closeMenuModal = this.closeMenuModal.bind(this);
    this.handleEdit = this.handleEdit.bind(this); // Function where we submit data
    this.handleDateTimeChange = this.handleDateTimeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange = date => this.setState({ date })

  openModal(member) {
    console.log(member);
    this.setState({
        modalIsOpen: true,
        resturantName: member.RESTAURANT_NAME,
        resturantID: member.RESTAURANT_ID,
    });
  }

  menuModal(member) {
    console.log(member);
    this.Auth.fetch('/user/booking/menu', {
      method: 'POST',
      body: JSON.stringify(member)
    }).then(res =>{
        console.log(res);
        this.setState({
          menuModalisOpen: true,
            resturantName: member.RESTAURANT_NAME,
            menu: res,
            resturantID: member.RESTAURANT_ID,
        })
      })
    .catch(err =>{
          alert(err);
    })
  }
  closeMenuModal() {
    this.setState({
      menuModalisOpen: false
    });
  }
  closeModal() {
    this.setState({
        modalIsOpen: false
    });
  }

  handleEdit(event) {
    event.preventDefault()
    console.log("EDIT");
  }

  handleDateTimeChange(event) {
    this.setState({
      date: event,
    });
  }

  componentWillMount() {
    if (!this.Auth.loggedIn()) {
      console.log("I FOUND YUOU!")
      window.location.assign('/login');
    }
    else{
      
      this.setState({
        user: decode(localStorage.getItem('id_token')),
        USERS_FIRST_NAME: decode(localStorage.getItem('id_token')).USERS_FIRST_NAME,
        USERS_LAST_NAME: decode(localStorage.getItem('id_token')).USERS_LAST_NAME,
        CONTACT_EMAIL: decode(localStorage.getItem('id_token')).CONTACT_EMAIL,
        USERS_ID: decode(localStorage.getItem('id_token')).USERS_ID
      });
      let self = this;
      fetch('/resturants/list', {
          method: 'GET'
      }).then(function(response) {
          if (response.status >= 400) {
              throw new Error("Bad response from server");
          }
          return response.json();
      }).then(function(data) {
      self.setState({resturants: data.recordset});          ;
      }).catch(err => {
        console.log('caught it!',err);
      })

    }
  }

  handleUserInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
    this.setState({valuesChanged: true});
  }

  handleSubmit(e){
    var options = this.state;
    this.Auth.fetch('resturants/book/' + this.state.resturantID, {
            method: 'POST',
            body: JSON.stringify({options})
    }).then(res =>{
        if(res.rowsAffected == 1){
          this.setState({
            modalIsOpen: false,
            booked: true,
            bookedText:'You have successfully booked ' + this.state.resturantName + " for " + this.state.pax + " people.",
            resturantName: '',
            resturantId: '',
            pax: ''
          });
        }
      })
      .catch(err =>{
          alert(err);
      })

    e.preventDefault();

  }

  render() {
    const loggedIn = localStorage.getItem('id_token');
    const decoded = decode(localStorage.getItem('id_token'));

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

    var bookedAlert = this.state.booked ?  <div className="alert alert-success">{this.state.bookedText}</div> : null ;
    
    return (      
      <div>
        <br/>
        {bookedAlert}
        {/* Begining of the Albumn Gallery */}
        <div className="album py-5 bg-light">
          <div className="row">
            {this.state.resturants.map(member => 
                <div className="col-md-4">
                  <div className="card mb-4 shadow-sm">
                    <img className="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" alt="Thumbnail [100%x225]" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22348%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20348%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1655204f27f%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A17pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1655204f27f%22%3E%3Crect%20width%3D%22348%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22115.859375%22%20y%3D%22120.2109375%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" data-holder-rendered="true" />
                    <div className="card-body">
                      <p className="card-text">{member.RESTAURANT_NAME}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                          <button onClick={() => this.menuModal(member)} className="btn btn-sm btn-outline-secondary" type="button">View Menu</button>
                          <button onClick={() => this.openModal(member)} className="btn btn-sm btn-outline-secondary" type="button">Book Now!</button>
                        </div>
                        <small className="text-muted">{member.RESTAURANT_DESCRIPTION}</small>
                      </div>
                    </div>
                  </div>
                </div>
            )}
            <Modal style={customStyles}
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}>
                <h1 style={headStyles}>{this.state.resturantName}</h1>
                <br/><br/>
                <form className="bookTable" onSubmit={this.handleSubmit}>
                  <h2>Book a Table!</h2>
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
                    >Book!</button>
                </form>
            </Modal>
            <Modal style={customStyles}
                isOpen={this.state.menuModalisOpen}
                onRequestClose={this.closeMenuModal}>
                <h1 style={headStylesMenu}>{this.state.resturantName} Menu</h1>
                <br/><br/>
                {this.state.menu.map(meal => 
                <div style={{borderBottom:"2px dotted #B5ABAB",fontFamily:'Arial,Verdana,Sans-serif'}} ><h2>{meal.MEAL_NAME}<span style={priceStyles}>${meal.MEAL_UNIT_PRICE}</span></h2><br/></div>
                )}
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}
