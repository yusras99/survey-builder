import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

/**
 * Display researcher name on top of webpage
 */
class Landing extends Component {
  componentWillMount() {
  }

  render() {
    if (!this.props.auth.isAuthenticated) {
      return (
        <div className="container">
        </div>
      );
    } else {
      return (
        <div className="container">
          Scientist: <b>{this.props.auth.user.username}</b>
        </div>
      );
    }
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(Landing);

// export default Landing;