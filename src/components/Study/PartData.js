import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  getPartData
} from "../../actions/dataActions"

import "./PartData.css";

class ExptConfigs extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.returnRow = this.returnRow.bind(this);
  }

  componentWillMount() {
    const username = this.props.match.params.username;
    const studyName = this.props.match.params.studyName;
    const exptName = this.props.match.params.exptName;
    const colName = studyName + "-" + exptName;
    this.props.getPartData(username, colName);
  }

  partDataHeader() {
    var item = {};
    if (!this.props.partData.length == 0) {
      item = this.props.partData[0];
    }
    const header = Object.keys(item).filter(x => x != "_id");
    return header.map(hd => {
      return (
      <th>{hd}</th>
      )
    })
  }

  returnRow(answer) {
    var item = {};
    if (!this.props.partData.length == 0) {
      item = this.props.partData[0];
    }
    const header = Object.keys(item).filter(x => x != "_id");
    return header.map(hd => {
      return (
        <th>
          {answer[hd]}
        </th>
      )
    })
  }

  showPartData() {
    if (!this.props.partData.length == 0) {
      return this.props.partData.map(answer => {
        return (
          <tr>
            {this.returnRow(answer)}
          </tr>
        )
      })
    }
  }

  // an action to fetch userData from APi for componentWillMount
  render() {
    const username = this.props.match.params.username;
    const studyName = this.props.match.params.studyName;
    const studyLink = "/" + username + "/" + studyName;
    return (
      <div>
        <br /><br />
        Back to <p> </p>
        <Link to={studyLink}>
          {studyName}
        </Link>
        <br /><br />
        <b>Participants data: </b>
        <br /><br />
        <table align="center">
          <tbody>
            <tr>{this.partDataHeader()}</tr>
            {this.showPartData()}
          </tbody>
        </table>
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