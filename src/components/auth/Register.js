import React, { Component } from "react";
import { Link } from "react-router-dom";

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
        console.log(newUser);
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
                        type="text"/>
                    <br/>
                    <br/>
                    Password: 
                    <input 
                        onChange={this.onChange} 
                        value={this.state.password} 
                        error={errors.password} 
                        id="password" 
                        type="password"/>
                    <br/>
                    <br/>
                    Confirm Password: 
                    <input 
                        onChange={this.onChange} 
                        value={this.state.password2} 
                        error={errors.password2} 
                        id="password2" 
                        type="password"/>
                    <br/>
                    <br/>
                    <button type="submit" className="btn">
                        Register
                    </button>
                </form>
            </div>
        );
    };
};

export default Register;