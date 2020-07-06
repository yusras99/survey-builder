import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
    getPartData
} from "../../actions/dataActions"

class ExptConfigs extends Component {
    componentWillMount() {
        const username = this.props.match.params.username;
        const studyName = this.props.match.params.studyName;
        const exptName = this.props.match.params.exptName;
        const colName = studyName + "-" + exptName;
        this.props.getPartData(username, colName);
    }

    showPartData() {
        const info = JSON.stringify(this.props.partData);
        return (
            <div className="container">
                {info}
            </div>
        )
    }

    // an action to fetch userData from APi for componentWillMount
    render () {
        return (
            <div className="container">
                <br/>
                {this.showPartData()}
            </div>
        )
    }
}

ExptConfigs.propTypes = {
    // Proptype.type, the type here must match initialState of reducer
    getPartData: PropTypes.func.isRequired,
    partData: PropTypes.array.isRequired,
    auth: PropTypes.object.isRequired
};

// interaction between reducer and store (state), connect to props 
// for components to use
const mapStateToProps = state => ({
    auth: state.auth,
    partData: state.dataFlow.partData
});

export default connect(
    mapStateToProps,
    { getPartData }
)(ExptConfigs);