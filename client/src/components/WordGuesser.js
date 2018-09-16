import React, { Component } from 'react';

class WordGuesser extends Component {

    constructor() {
        super();
        this.state = {
          data: []
        };
    }
    
    componentDidMount() {
        fetch('/week7/checkWord')
          .then(res => res.json())
          .then(data => this.setState({data}, () => console.log('Customers fetched...', data)));
    }


  render() {

    // Check if this is for a new Booking or not
        return(
            
            <div>
                <h1>Check My Word!</h1>
                <form action={this.handleSubmit}>
                    <label htmlFor="myWord">Tell me your word!: </label>
                    <input type="text" name="myWord"></input><br/>
                    <button type="submit">Submit!</button>
                </form>
                {/* {this.state.customers.map(customer => 
                <b>{data}</b>
                )} */}
                <br/><br/>
            </div>
        );
  }
}
export default WordGuesser;
