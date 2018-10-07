import React, { Component } from 'react';
import Slider from "./Slider";

class createResturant extends Component {
  render() {
    return (
          <div>
                <form className="bookTable" onSubmit={this.handleSubmit}>
                  <h2>Create a Restaurant</h2>             
                  <button type="submit" className="btn btn-primary" 
                    // disabled={!this.state.formValid}
                    >Create Restaurant!</button>
                </form>
          </div>

    );
  }
}
export default createResturant;
