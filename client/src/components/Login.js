import React, { Component } from 'react';
import Authentication from './Authentication';

class Login extends Component {

    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
        this.Auth = new Authentication();
    }

    handleSubmit(e){
      this.Auth.login(this.state.username,this.state.password)
        .then(res =>{
          this.props.history.replace('/');
        })
        .catch(err =>{
            alert(err);
        })

      e.preventDefault();

    }

    handleChange(e){
      this.setState(
          {
              [e.target.name]: e.target.value
          }
      )
    }

    componentWillMount(){
      if(this.Auth.loggedIn())
          this.props.history.replace('/');
    }

    render() {
        return (
            <div className="center">
                <div className="card">
                    <h1>Login</h1>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            className="form-item"
                            placeholder="Username goes here..."
                            name="username"
                            type="text"
                            onChange={this.handleChange}
                        />
                        <input
                            className="form-item"
                            placeholder="Password goes here..."
                            name="password"
                            type="password"
                            onChange={this.handleChange}
                        />
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        );
    }

    

    
    
}

export default Login;