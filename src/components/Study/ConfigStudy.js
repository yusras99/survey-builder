import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
    getStudyInfo,
    createExptCol
} from "../../actions/dataActions"

class ConfigStudy extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.deployExpts = this.deployExpts.bind(this);
    }
    // note: using params to get studyName is probably not good practice. 
    // figure out a better way to get info from previous page later, might
    // use cookies? or does react have some way to pass states between pages?
    componentWillMount() {
        const username = this.props.auth.user.username;
        const studyName = this.props.match.params.studyName;
        this.props.getStudyInfo(username, studyName);
    }

    // for now deployment simply creates a collection for each experiment 
    // that would later store participants data
    deployExpts(e) {
        e.preventDefault();
        // create a collection. Collection name: studyName - exptName 
        const username = this.props.auth.user.username;
        const studyName = this.props.match.params.studyName;
        const exptNames = this.props.experiments.map(item => item.exptName);
        console.log(exptNames);
        exptNames.forEach(expt_name => {
            this.props.createExptCol(username, studyName + "-" + expt_name);
        });
        // the alert could include res data from API
        alert("Successfully deployed your experiments")
    }

    getExptNames() {
        const username = this.props.match.params.username;
        const studyName = this.props.match.params.studyName;
        // check if the experiments are deployed 
        return this.props.experiments.map(expt => {
            const exptName = expt.exptName;
            const exptDataLink = "/" + username + "/" + studyName + "/" + 
                exptName + "/configs";
            const partDataLink = "/" + username + "/" + studyName + "/" + 
                exptName + "/participantsData";
            return (
                <div className="container">
                    {expt.exptName} <p> </p>
                    <Link to={exptDataLink}>
                        Experiment Configs
                    </Link> <p> </p>
                    <Link to={partDataLink}>
                        View Participants Data
                    </Link>
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
                <form onSubmit={this.deployExpts}>
                    <br/>
                    Your Experiments
                    <br/><br/>
                    {this.getExptNames()}
                    <br/><br/>
                    <input type="submit" value="Deploy All Experiments" />
                </form>
            </div>
        )
    }
}

ConfigStudy.propTypes = {
    // Proptype.type, the type here must match initialState of reducer
    getStudyInfo: PropTypes.func.isRequired,
    createExptCol: PropTypes.func.isRequired,
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
    { getStudyInfo, createExptCol }
)(ConfigStudy);