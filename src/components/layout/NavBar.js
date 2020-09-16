import React, { Component } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";

/**
 * Navigation bar
 */
class Navbar extends Component {
  render() {
    const userIsLoggedIn = this.props.auth.isAuthenticated;
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link to="/">
              Home
            </Link>
            <br/>
            {userIsLoggedIn ? '' : 
              <Link to="/register">Register</Link>}
            <br/>
            {userIsLoggedIn ? 
              <Link to="/dashboard"> Dashboard </Link> 
              : 
              <Link to="/login">Login</Link>}
          </div>
        </nav>
      </div>
    );
  }
}

// export default Navbar;
Navbar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Navbar);
