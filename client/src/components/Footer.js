import React, { Component } from 'react';
import { addBackToTop } from 'vanilla-back-to-top'

class Footer extends Component {
  render() {
    return (
      <div>
        <footer className="text-muted">
            <div className="container">
                {/*add a back to top button*/}
                <p className="float-right" onClick={addBackToTop({diameter: 60,backgroundColor: 'dimgrey',textColor: 'white'})}> 
                </p>
                <p>Book-A-Table</p>
                <p> AIP 2018 Assessment 3</p>
            </div>
        </footer>
      </div>
    );
  }
}
export default Footer;
