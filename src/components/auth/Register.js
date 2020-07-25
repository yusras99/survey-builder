import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

import { registerUser } from "../../actions/authActions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      password2: "",
      errors: {}
    };
  };

  componentDidMount() {
    // If logged in and user navigates to Register page,
    // should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    };
  };

  // <form> element will have a corresponding onChange event that sends value
  // to this.state. Works similarly to html form and flask request. 
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const errors = this.state.errors;
    return (
      <div className="container">
        <h1>Register below</h1>
        <p className="grey-text text-darken-1">
          Already have an account?
                    <Link to="/login">Log in</Link>
        </p>
        <form noValidate onSubmit={this.onSubmit}>
          Username:
                    <input
            onChange={this.onChange}
            value={this.state.username}
            error={errors.username}
            id="username"
            type="text"
            className={classnames("", {
              // userExists comes from res json message in API
              invalid: errors.userExists
            })} />
          <span className="red-text">{errors.userExists}</span>
          <br />
          <br />
            Password:
            <input
              onChange={this.onChange}
              value={this.state.password}
              error={errors.password}
              id="password"
              type="password"
              className={classnames("", {
              invalid: errors.password})} />
          <span className="red-text">{errors.password}</span>
          <br />
          <br />
            Confirm Password:
            <input
              onChange={this.onChange}
              value={this.state.password2}
              error={errors.password2}
              id="password2"
              type="password"
              className={classnames("", {
                invalid: errors.password2})} />
          <span className="red-text">{errors.password2}</span>
          <br />
          <br />
          <button type="submit" className="btn">
            Register
          </button>
        </form>
      </div>
    );
  };
};

// export default Register;

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

// map state from redux props to use inside components
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

// linking redux to Register component
// withRouter makes it easy to redirect within a component
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));