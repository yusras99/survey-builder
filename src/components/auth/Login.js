import React, { Component } from "react";
import { Link } from "react-router-dom";
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
    // to this.state. Works similarly to html form and flask request. 
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        const userData = {
            username: this.state.username,
            password: this.state.password
        };
        console.log(userData);
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
                            invalid: errors.username
                            // || USERNAME NOT FOUND
                        })}/>
                    <span className="red-text">{errors.email}</span>
                    <br/>
                    <br/>
                    Password: 
                    <input 
                        onChange={this.onChange} 
                        value={this.state.password} 
                        error={errors.password} 
                        id="password" 
                        type="password"
                        className={classnames("", {
                            invalid: errors.password || errors.passwordincorrect
                        })}/>
                    <br/>
                    <br/>
                    <input 
                        type="submit" 
                        value="Log in" 
                        class="btn"/>
                    <span className="red-text">
                        {errors.password}
                        {errors.passwordincorrect}
                    </span>
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