import React, { Component } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";

class Navbar extends Component {
  render() {
    const userIsLoggedIn = this.props.auth.isAuthenticated;
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link to={process.env.PUBLIC_URL + "/"}>
              Home
            </Link>
            <br/>
            {userIsLoggedIn ? '' : 
              <Link to={process.env.PUBLIC_URL + "/register"}>Register</Link>}
            <br/>
            {userIsLoggedIn ? 
              <Link to={process.env.PUBLIC_URL + "/dashboard"}> Dashboard </Link> 
              : 
              <Link to={process.env.PUBLIC_URL + "/login"}>Login</Link>}
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
