import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
    getStudyInfo
} from "../../actions/dataActions"

class ExptConfigs extends Component {
    componentDidMount() {
        const username = this.props.match.params.username;
        const studyName = this.props.match.params.studyName;
        this.props.getStudyInfo(username, studyName);
        // console.log(this.props.experiments);
    }

    showExptData() {
        const thisExpt = this.props.match.params.exptName;
        const exptObj = 
            this.props.experiments.find(item => item.exptName == thisExpt);
        // console.log(exptObj);
        // const exptName = exptObj.exptName;
        // SOLVE THIS ERROR
        const info = JSON.stringify(exptObj);
        return (
            <div>
                {/* <p>{exptName}</p> */}
            </div>
        )
    }

    // an action to fetch userData from APi for componentWillMount
    render () {
        return (
            <div className="container">
                <br/><br/>
                {this.showExptData()}
            </div>
        )
    }
}

ExptConfigs.propTypes = {
    // Proptype.type, the type here must match initialState of reducer
    getStudyInfo: PropTypes.func.isRequired,
    experiments: PropTypes.array.isRequired,
    auth: PropTypes.object.isRequired
};

// interaction between reducer and store (state), connect to props 
// for components to use
const mapStateToProps = state => ({
    auth: state.auth,
    experiments: state.dataFlow.studyInfo
});

export default connect(
    mapStateToProps,
    { getStudyInfo }
)(ExptConfigs);