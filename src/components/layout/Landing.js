import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
  componentWillMount() {
    console.log(!this.props.auth)
  }

  render() {
    if (!this.props.auth.isAuthenticated) {
      return (
        <div className="container">
              <p>
              Researcher App
              </p>
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