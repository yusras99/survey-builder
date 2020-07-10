import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class HomePage extends Component {
  render() {
      return(
        <div className="container">
            <h1>
            Welcome to Psych Researcher App!
            </h1>
        </div>
      )
  }
}

HomePage.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(HomePage);

// export default Landing;