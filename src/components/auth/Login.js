import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
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
    if (nextProps.auth.isAuthenticated) {
      // push user to dashboard when they login
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  // <form> element will have a corresponding onChange event that sends value
  // to this.state. Works similarly to html form post and request. 
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const userData = {
      username: this.state.username,
      password: this.state.password
    };
    // we are redirecting wthin a component, so we don't need to
    // pass in this.props.history
    this.props.loginUser(userData);
  };
  render() {
    const errors = this.state.errors;
    return (
      <div className="container">
        <h1>Log in</h1>
        <form noValidate onSubmit={this.onSubmit}>
          Username:
                    <input
            onChange={this.onChange}
            value={this.state.username}
            error={errors.username}
            id="username"
            type="text"
            className={classnames("", {
              invalid: errors.userNotFound
              // || USERNAME NOT FOUND
            })} />
          <span className="red-text">{errors.userNotFound}</span>
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
              invalid: errors.pwdIncorrect
            })} />
          <span className="red-text">{errors.pwdIncorrect}</span>
          <br />
          <br />
          <input
            type="submit"
            value="Log in"
            className="btn" />
        </form>
      </div>
    );
  };
};

// export default Login;

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);