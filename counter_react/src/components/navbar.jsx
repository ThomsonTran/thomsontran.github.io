import React, { Component } from "react";
class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <div className="container">
          <p>
            Total Unique Items :
            <span className="badge badge-pill badge-secondary ml-2">
              {this.props.totalCounters}
            </span>
          </p>
        </div>
      </nav>
    );
  }
}

export default NavBar;
