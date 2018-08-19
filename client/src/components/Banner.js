import React, { Component } from 'react';

class Banner extends Component {
  render() {
    return (
      <div>
        <section className="jumbotron text-center">
          <div className="container">
            <h1 className="jumbotron-heading">Resturant Specials!</h1>
            <p className="lead text-muted">Resturant Specials or other Advertisements....</p>
          </div>
        </section>
      </div>
    );
  }
}
export default Banner;
