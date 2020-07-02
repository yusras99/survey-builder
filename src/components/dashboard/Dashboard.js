import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import TabList from "../TabList/TabList";

import './Dashboard.css';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            surveys: [
                {id: 1, name: "survey1"}, 
                {id: 2, name: "survey2"}
            ]
        };
    }

    // need to fetch data and put it in componentWillMount

    getNames() {
        return this.state.surveys.map(item => {
            const username = this.props.auth.user.username;
            const nameLink = "/" + username + "/" + item.name;
            const dataLink = nameLink + "/" + "data";
            return (
            <div className="text-center">
                <p>
                    <Link to={nameLink}>
                        <p>{item.name}</p>
                    </Link> <p> </p>
                    <Link to={dataLink}>
                        <p>Data</p>
                    </Link>
                </p>
            </div>)
        });
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    // Researcher can create a collection for each survey
    onSubmit = e => {
        e.preventDefault();
    }

    render() {
        const username = this.props.auth.user.username;
        return (
            <div className="container">
                <h1>You are logged in.</h1>
                <p>Scientist: <b>{username}</b></p>
                <br/><br/>
                <p>Your surveys: </p>
                {this.getNames()}
                <br/>
                <Link to="/researcher/survey-builder">
                    Build your own survey
                </Link>
                <br />
                Survey Name
                <Link to="/researcher/survey-builder/data">
                    Data
                </Link>
                <br /><br />
                {/* Collection management */}
                {/* Change button later */}
                <button
                    onClick={this.onLogoutClick}
                    className="btn"
                >
                    Logout
                </button>
            </div>
        )
    };
};

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);