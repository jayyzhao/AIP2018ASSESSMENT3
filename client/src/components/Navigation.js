import React from 'react';
import Authentication from './Authentication';
import decode from 'jwt-decode';
import "./css/Navigation.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import {
  Collapse,
  NavbarToggler,
  NavbarBrand,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';


const NavItem = props => {
  const pageURI = window.location.pathname+window.location.search
  const liClassName = (props.path === pageURI) ? "nav-item active" : "nav-item";
  const aClassName = props.disabled ? "nav-link disabled" : "nav-link"
  return (
    <li className={liClassName}>
      <a href={props.path} className={aClassName}>
        {props.name}
        {(props.path === pageURI) ? (<span className="sr-only">(current)</span>) : ''}
      </a>
    </li>
  );
}

class Navigation extends React.Component {

  constructor(props){
    super();
    this.state = {
      user: [],
    }
    this.Auth = new Authentication();
  }



  componentWillMount() {
    if (!this.Auth.loggedIn()) {
        console.log("Not Logged In");
    }
    else{
      this.setState({user: decode(localStorage.getItem('id_token'))});
      // let self = this;
      // fetch('/user/', {
      //     method: 'GET'
      // }).then(function(response) {
      //     if (response.status >= 400) {
      //         throw new Error("Bad response from server");
      //     }
      //     return response.json();
      // }).then(function(data) {
      // user: []
      // self.setState({user: data.recordset});          ;
      // }).catch(err => {
      //   console.log('caught it!',err);
      // })
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/" style={{fontSize:30}}>Book-A-Table</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <NavItem path="/" name="Home" />
            <NavItem path="/Book" name="Book" />  
			<NavItem path="/MyBookings" name="My Bookings" />  
			<NavItem path="/MyRestaurants" name="My Restaurants" />  
          </ul>
          {this.state.user.USERS_ID > 0 ? (
            <ul className="navbar-nav my-1 my-lg-0" style={{color:'white',fontStyle:'italic'}}>
              <span className="userInfo">Welcome {this.state.user.USERS_FIRST_NAME} {this.state.user.USERS_LAST_NAME}</span> 
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                <FontAwesomeIcon className="userIcon" icon={faUserCircle} size="lg"></FontAwesomeIcon>
                </DropdownToggle>
                <DropdownMenu right className="userIconDropDown" style={{fontSize:'15px'}}>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </ul>
          ): 
            <ul className="navbar-nav my-2 my-lg-0" >
              <NavItem path="/signup" name="Sign Up"/>
              <NavItem path="/login" name="Login"/>
            </ul>
          }
        </div>
      </nav>
    )
  }
}

export default Navigation;