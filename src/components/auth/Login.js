import React, { Component } from "react";
import { Link } from "react-router-dom";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            errors: {}
        };
    };
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
    };
    render() {
        const errors = this.state.errors;
        return (
            <div className="container">
                <h1>Log in below</h1>
                <form noValidate onSubmit={this.onSubmit}>
                    Username:
                    <input 
                        onChange={this.onChange} 
                        value={this.state.username} 
                        error={errors.username} 
                        id="username" 
                        type="text"/>
                    Password: 
                    <input 
                        onChange={this.onChange} 
                        value={this.state.password} 
                        error={errors.password} 
                        id="password" 
                        type="password"/>
                    <input 
                        type="submit" 
                        value="Log in" 
                        class="btn"/>
                </form>
            </div>
        );
    };
};

export default Login;