import React from 'react';
import Authentication from './Authentication';
import decode from 'jwt-decode';
import "./css/Navigation.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Route, Redirect } from 'react-router-dom';

import {
  Collapse,
  NavbarToggler,
  NavbarBrand,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Navbar,
  Nav } from 'reactstrap';


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
      isOpen : false
    }
    this.Auth = new Authentication();
    this.logout = this.logout.bind(this)
    this.toggle = this.toggle.bind(this)

  }

  logout(e) {
    this.setState({user: []});
    localStorage.clear();
    window.location.assign('/login');
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }


  componentWillMount() {
    if (!this.Auth.loggedIn()) {
        console.log("Not Logged In");
    }
    else{
      this.setState({user: decode(localStorage.getItem('id_token'))});
    }
  }

  render() {
    console.log(this.state.user)
    const loggedIn = localStorage.getItem('id_token');
    if(loggedIn){
      const decoded = decode(localStorage.getItem('id_token'));
      return (
        <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Book A Table</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem path="/" name="Home" />
              <NavItem path="/Book" name="My Bookings" />  
              {decoded.IS_OWNER == 1 ? 
              <NavItem path="/MyRestaurants" name="My Restaurants" />	: null}
              {decoded.IS_OWNER == 1 ? 
              <NavItem path="/RestaurantBookings" name="My Restaurants Bookings" />	: null}
            {decoded.USERS_ID > 0 ? (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                <FontAwesomeIcon className="userIcon" icon={faUserCircle} size="lg"></FontAwesomeIcon>
                </DropdownToggle>
                <DropdownMenu right className="userIconDropDown" style={{fontSize:'15px'}}>
                {decoded.IS_OWNER == 1 ? 
                    <div>
                    <DropdownItem>
                      <a href="/createResturant">
                        Create Resutrant
                      </a>
                    </DropdownItem>
                    <DropdownItem divider /></div>
                    : null}
                    <DropdownItem>
                    <div onClick={this.logout}>
                      Logout
                    </div>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                ): 
                  <ul className="navbar-nav my-2 my-lg-0" >
                    <NavItem path="/signup" name="Sign Up"/>
                    <NavItem path="/login" name="Login"/>
                  </ul>
                }
              </Nav>
          </Collapse>
        </Navbar>
      </div>
      )
    }
    else{
      return (
        <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Book A Table</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            {this.state.user.USERS_ID > 0 ? (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                <FontAwesomeIcon className="userIcon" icon={faUserCircle} size="lg"></FontAwesomeIcon>
                </DropdownToggle>
                <DropdownMenu right className="userIconDropDown" style={{fontSize:'15px'}}>
                    <DropdownItem divider />
                    <DropdownItem>
                    <div onClick={this.logout}>
                      Logout
                    </div>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                ): 
                  <ul className="navbar-nav my-2 my-lg-0" >
                    <NavItem path="/signup" name="Sign Up"/>
                    <NavItem path="/login" name="Login"/>
                  </ul>
                }
              </Nav>
          </Collapse>
        </Navbar>
      </div>
      )

    }

    
  }
}

export default Navigation;