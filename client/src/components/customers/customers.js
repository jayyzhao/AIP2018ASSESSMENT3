import React, { Component } from 'react';
import { Button } from 'reactstrap';

import './customers.css';

class Customers extends Component {
  render() {
    return (
      <div>
	<h2>Customers</h2>
        <button color="danger">Click Me!</button>
      </div>
    );
  }
}


export default (props) => {
  return (
    <div>
       <h2>Customers</h2>
       <Button color="danger">Danger!</Button>
     </div>
  );
};

//export default Customers;
