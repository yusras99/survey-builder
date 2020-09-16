import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  getStudyInfo
} from "../../actions/dataActions"

/**
 * Shows experiment configurations
 * TODO: Improve this component so that data presentation looks better
 */
class ExptConfigs extends Component {

  componentDidMount() {
    const username = this.props.match.params.username;
    const studyName = this.props.match.params.studyName;
    this.props.getStudyInfo(username, studyName);
  }

  /**
   * Get experiment config data (obj) from redux store and show it as a string
   */
  showExptData() {
    const thisExpt = this.props.match.params.exptName;
    if (!this.props.experiments.length == 0) {
      const exptObj =
        this.props.experiments.find(item => item.exptName == thisExpt);
      const JSONString = JSON.stringify(exptObj);
      return (
        <div>
          {JSONString}
        </div>
      )
    }
  }

  render() {
    const username = this.props.match.params.username;
    const studyName = this.props.match.params.studyName;
    const studyLink = "/" + username + "/" + studyName;
    return (
      <div className="container">
        <h2>Experiment: {this.props.match.params.exptName}</h2>
        Back to <p> </p>
        <Link to={studyLink}>
          {studyName}
        </Link>
        <br /><br />
        <b>Configuration data: </b>
        <br /><br />
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