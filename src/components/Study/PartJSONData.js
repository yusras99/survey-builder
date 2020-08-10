import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CsvDownload from "react-json-to-csv";

import {
  getColData
} from "../../actions/dataActions"

import "./PartData.css";

class ExptConfigs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finalObj: {}
    };

    this.makeObj = this.makeObj.bind(this);
    this.showJSONData = this.showJSONData.bind(this);
    this.downloadData = this.downloadData.bind(this);
  }

  componentWillMount() {
    const username = this.props.match.params.username;
    const studyName = this.props.match.params.studyName;
    const exptName = this.props.match.params.exptName;
    const colName = studyName + "-" + exptName;
    this.props.getColData(username, colName);
  }

  makeObj() {
    if (!Object.keys(this.props.colData).length == 0) {
      // console.log(this.props.colData);
      var obj = {};
      const arrToProcess = this.props.colData;
      arrToProcess.forEach(item => {
        const id = item.participantID;
        const keysInItem = Object.keys(item);
        const qKeys = 
          keysInItem.filter(k => k != "participantID" && k != "_id");
        // const info = {};
        // qKeys.forEach(k => info[k] = item[k]);
        // console.log(info);
        if (Object.keys(obj).includes(id)) {
          const prevData = obj[id];
          qKeys.forEach(k => prevData[k] = item[k]);
          obj[id] = prevData;
        } else {
          const nowData = {};
          qKeys.forEach(k => nowData[k] = item[k]);
          obj[id] = nowData;
        }
      })
      return obj;
    }
  }

  showJSONData() {
    const obj = this.makeObj();
    if (obj != null) {
      const allIDs = Object.keys(obj);
      return allIDs.map(id => {
        const data = obj[id];
        const stringedData = JSON.stringify(data);
        return (
          <div>
            <br/>
            <p>{id}: {stringedData}</p>
          </div>
        )
      })
    }
  }

  downloadData() {
    const obj = this.makeObj();
    if (obj != null) {
      console.log(JSON.stringify(obj));
    }
  }
  

  // an action to fetch userData from APi for componentWillMount
  render() {
    const username = this.props.match.params.username;
    const studyName = this.props.match.params.studyName;
    const studyLink = "/" + username + "/" + studyName;
    const obj = this.makeObj();
    if (obj != null) {
      return (
        <div>
          <h2>Experiment: {this.props.match.params.exptName}</h2>
          Back to <p> </p>
          <Link to={studyLink}>
            {studyName}
          </Link>
          <br/>
          <h4>Participants data: </h4> 
          <button onClick={this.downloadData}>Download data as csv</button>
          {/* <CsvDownload data={obj} /> */}
          {this.showJSONData()}
        </div>
      )
    } else {
      return (
        <div>hello</div>
      )
    }
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