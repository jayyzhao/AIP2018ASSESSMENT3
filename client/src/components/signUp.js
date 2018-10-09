import React, { Component } from 'react';
import Slider from "./Slider";

class signUp extends Component {
  //this page deals with sign up and handles user information with error checkinng,then submit to server
    constructor() {
        super();
        this.state = {
            data: [],
            user : [],
            USERS_FIRST_NAME: '',
            USERS_LAST_NAME: '',
            CONTACT_EMAIL: '',
            confirmPassword: '',
            password: '',
            IS_OWNER: false,
            passwordText: '',
            passwordAlert: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleUserInput (e) {//set user input info to what we get
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
        this.setState({valuesChanged: true});
      }

      handleSubmit(e){
        //format checking
        if(this.state.password != this.state.confirmPassword){
            this.setState({passwordText: "Password Does Not Match", passwordAlert: true});
        }
        else{
            this.setState({passwordAlert: false});
            var options = this.state;
            console.log(options)
            fetch('/user/create', {
                    method: 'POST',
                    body: JSON.stringify({options}),
                    headers:{'Accept': 'application/json',
                    'Content-Type': 'application/json'}
            }).then(res =>{
                console.log(res)
                alert("SUCCESS!")
                window.location.assign('/login');
            })
            .catch(err =>{
                alert(err);
            })

        }
       
    
        e.preventDefault();
    
        }



  render() {
    var passwordAlert = this.state.passwordAlert ?  <div className="alert alert-danger">{this.state.passwordText}</div> : null ;
    return (
        
          <div>
              <br/>
              {passwordAlert}
                <form className="bookTable" onSubmit={this.handleSubmit}>
                  <h2>Create an Account</h2>       
                  <div className="form-group">
                  <label htmlFor="email">First Name</label>
                    <input 
                      type="text" 
                      className="form-control"
                      name="USERS_FIRST_NAME" 
                      value={this.state.USERS_FIRST_NAME} 
                      onChange={(event) => this.handleUserInput(event)}
                      required
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
                      required
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
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                      type="password" 
                      className="form-control"
                      name="password" 
                      value={this.state.password} 
                      onChange={(event) => this.handleUserInput(event)}
                      required
                    />
                  </div>     
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input 
                      type="password" 
                      className="form-control"
                      name="confirmPassword" 
                      value={this.state.confirmPassword} 
                      onChange={(event) => this.handleUserInput(event)}
                      required
                    />
                  </div>  
                  <div className="form-group">
                    <label htmlFor="IS_OWNER">Restaurant Owner?</label>
                    <input 
                      type="checkbox" 
                      className="form-control"
                      name="IS_OWNER" 
                      value={this.state.IS_OWNER} 
                      onChange={(event) => this.handleUserInput(event)}
                      
                    />
                  </div>              
                  <button type="submit" className="btn btn-primary" 
                    >Create Account!</button>
                </form>
          </div>

    );
  }
}
export default signUp;
