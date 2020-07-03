import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import TabList from "../TabList/TabList";

import { fetchExptNames } from "../../actions/dataActions";

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

    componentWillMount() {
        this.props.fetchExptNames();
    }

    // need to fetch data and put it in componentWillMount
    fetchUserData () {
        return null;
    }

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
                    <Link to={dataLink} onClick={this.fetchUserData}>
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
                <br /><br />
                {/* Collection management */}
                {/* Change button later */}
                <button
                    onClick={this.onLogoutClick}
                    className="btn">
                    Logout
                </button>
            </div>
        )
    };
};

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    dataFlow: PropTypes.object.isRequired,
    fetchExptNames: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    dataFlow: state.dataFlow
});

export default connect(
    mapStateToProps,
    { logoutUser, fetchExptNames }
)(Dashboard);