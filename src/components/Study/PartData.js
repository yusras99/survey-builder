import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  getPartData
} from "../../actions/dataActions"

import "./PartData.css";

class ExptConfigs extends Component {
  componentWillMount() {
    const username = this.props.match.params.username;
    const studyName = this.props.match.params.studyName;
    const exptName = this.props.match.params.exptName;
    const colName = studyName + "-" + exptName;
    this.props.getPartData(username, colName);
  }

  partDataHeader() {
    const header = ["Participant ID", "Slider Value"];
    return header.map(hd => {
      return (
      <th>{hd}</th>
      )
    })
  }

  showPartData() {
    console.log(this.props.partData);
    if (!this.props.partData.length == 0) {
      return this.props.partData.map(answer => {
        const { _id, PartID, sliderVal } = answer;
        return (
          <tr key={_id}>
            <th>{PartID}</th>
            <th>{sliderVal}</th>
          </tr>
        )
      })
    }
    // const info = JSON.stringify(this.props.partData);
    // return (
    //   <div className="container">
    //     {info}
    //   </div>
    // )
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