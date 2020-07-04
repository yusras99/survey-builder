import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { logoutUser } from "../../actions/authActions";

import {
    addStudyName,
    getDBInfo
} from "../../actions/dataActions";

import './Dashboard.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studyName: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onAddStudy = this.onAddStudy.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    // load experiment names when the page loads
    componentWillMount() {
        const username = this.props.auth.user.username;
        this.props.getDBInfo(username); // dbInfo will be in the store now
    }

    getStudyNames() {
        // TODO. Filter out study names. If an item doesn't have study names
        // as a key, then don't do anything. (wrap everything inside an if)
        const allInfo = this.props.dataFlowDBInfo;
        return allInfo.map(item => {
            const allKeys = Object.keys(item);
            if (allKeys.includes("studyName")) {
                const username = this.props.auth.user.username;
                const link = "/" + username + "/" + item.studyName;
                return(
                    <div className="container">
                        <p> 
                            {item.studyName} <p> </p>
                            <Link to={link}>
                                Configure
                            </Link>
                        </p>
                    </div>
                )
            }
        });
    }

    onAddStudy(e) {
        e.preventDefault();
        const username = this.props.auth.user.username;
        this.props.addStudyName(username, this.state.studyName);
        // alert("Your study has been succesfully created.");
    };

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const username = this.props.auth.user.username;
        return (
            <div className="container">
                <h1>You are logged in.</h1>
                <p>Scientist: <b>{username}</b></p>
                <br/><br/>

                <form onSubmit={this.onAddStudy}>
                    Enter a name for your study: <p>  </p>
                    <input type="text" name="studyName" 
                        value={this.state.studyName} onChange={this.onChange}/>
                    <input type="submit" value="Add Study"/>
                </form>

                <br/><br/>
                {this.getStudyNames()}
                <br/><br/>

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
    // Proptype.type, the type here must match initialState of reducer
    logoutUser: PropTypes.func.isRequired,
    addStudyName: PropTypes.func.isRequired,
    getDBInfo: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    dataFlowDBInfo: PropTypes.array.isRequired
};

// interaction between reducer and store (state), connect to props 
// for components to use
const mapStateToProps = state => ({
    auth: state.auth,
    dataFlowDBInfo: state.dataFlow.dbInfo
});

export default connect(
    mapStateToProps,
    { logoutUser, addStudyName, getDBInfo }
)(Dashboard);