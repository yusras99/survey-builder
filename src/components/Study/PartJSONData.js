import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  getColData
} from "../../actions/dataActions"

import "./PartData.css";

class ExptConfigs extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.showJSONData = this.showJSONData.bind(this);
  }

  componentWillMount() {
    const username = this.props.match.params.username;
    const studyName = this.props.match.params.studyName;
    const exptName = this.props.match.params.exptName;
    const colName = studyName + "-" + exptName;
    this.props.getColData(username, colName);
  }

  componentDidMount() {
    console.log(this.props.match.params.exptName);
  }

  showJSONData() {
    if (!Object.keys(this.props.colData).length == 0) {
      const data = JSON.stringify(this.props.colData);
      return (
        <div>
          {data}
        </div>
      );
    }
  }

  // an action to fetch userData from APi for componentWillMount
  render() {
    const username = this.props.match.params.username;
    const studyName = this.props.match.params.studyName;
    const studyLink = "/" + username + "/" + studyName;
    return (
      <div>
        <h2>Experiment: {this.props.match.params.exptName}</h2>
        Back to <p> </p>
        <Link to={studyLink}>
          {studyName}
        </Link>
        <br/>
        <h4>Participants data: </h4>
        {this.showJSONData()}
      </div>
    )
  }
}

ExptConfigs.propTypes = {
  // Proptype.type, the type here must match initialState of reducer
  getColData: PropTypes.func.isRequired,
  colData: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired
};

// interaction between reducer and store (state), connect to props 
// for components to use
const mapStateToProps = state => ({
  auth: state.auth,
  colData: state.dataFlow.colData
});

export default connect(
  mapStateToProps,
  { getColData }
)(ExptConfigs);