import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
    getStudyInfo
} from "../../actions/dataActions"

class ConfigStudy extends Component {
    componentWillMount() {
        const username = this.props.auth.user.username;
        const studyName = this.props.match.params.studyName;
        this.props.getStudyInfo(username, studyName);
    }

    getExptNames() {
        console.log(this.props.experiments)
        return this.props.experiments.map(expt => {
            return (
                <div className="container">
                    <p>
                        {expt.exptName}
                    </p>
                </div>
            )
        })
    }

    // an action to fetch userData from APi for componentWillMount
    render () {
        const username = this.props.match.params.username;
        const studyName = this.props.match.params.studyName;
        const exptBuilderLink = "/" + username + "/" + 
            studyName + "/exptBuilder"

        return (
            <div className="container">
                <br/>
                <b>{this.props.match.params.studyName}</b>
                <br/><br/>
                <Link to={exptBuilderLink}>
                    Build an Experiment
                </Link>
                <br/><br/>
                {this.getExptNames()}
            </div>
        )
    }
}

ConfigStudy.propTypes = {
    // Proptype.type, the type here must match initialState of reducer
    getStudyInfo: PropTypes.func.isRequired,
    experiments: PropTypes.array.isRequired,
    auth: PropTypes.object.isRequired
};

// interaction between reducer and store (state), connect to props 
// for components to use
const mapStateToProps = state => ({
    auth: state.auth,
    experiments: state.dataFlow.studyInfo,
});

export default connect(
    mapStateToProps,
    { getStudyInfo }
)(ConfigStudy);