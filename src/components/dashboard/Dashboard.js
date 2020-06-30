import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";

class Dashboard extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { user } = this.props.auth;
        return (
            <div className="container">
                <h1>You are logged in.</h1> <br/><br/>
                <br/>
                <Link to="/researcher/survey-builder">
                    Build your own survey
                </Link>
                <br/><br/><br/>
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