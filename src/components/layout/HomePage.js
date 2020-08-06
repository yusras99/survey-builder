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
            Please click on this <p></p>
            <a target="_blank" href="https://github.com/statistical-perceptions/statistical-perceptions.github.io">link</a> <p></p>
            to view researcher user guide. 
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