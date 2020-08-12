import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CSVLink } from "react-csv";
import axios from "axios";

import {
  getColNames,
  getColsData
} from "../../actions/dataActions"

import "./PartData.css";

class PartStudyData extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.makeArr = this.makeArr.bind(this);
    this.showJSONData = this.showJSONData.bind(this);
  }

  componentWillMount() {
    const username = this.props.match.params.username;
    axios
    .get('https://test-api-615.herokuapp.com/api/' + username + "/collections")
    .then(res => {
      const nameArr = res.data;
      const partColNames = nameArr.filter(name => 
        name != "info" && name != "itemData");
      console.log(partColNames);
      partColNames.map(colName => this.props.getColsData(username, colName));
    })
  }

  flattenObj(obj) {
    var flattendObj = {};
    const flattenObject = (obj, keyName) => {
      Object.keys(obj).forEach(key => {
        var newKey = `${keyName}.${key}` 
        if (typeof obj[key] === "object") {
          // calling the function again
          flattenObject(obj[key], newKey);
        } else {
          flattendObj[newKey] = obj[key];
        }
      });
    };
    flattenObject(obj, "");

    function renameKey (obj, oldKey, newKey) {
      obj[newKey] = obj[oldKey];
      delete obj[oldKey];
    }

    const allKeys = Object.keys(flattendObj);
    allKeys.map(k => {
      const oldKey = k;
      const newKey = oldKey.substr(1, oldKey.length);
      renameKey(flattendObj, oldKey, newKey)
    })

    return flattendObj;
  } 

  makeArr() {
    if (!Object.keys(this.props.colsData).length == 0) {
      // console.log(this.props.colData);
      var arr = [];
      var ids = [];
      const arrToProcess = this.props.colsData;
      // console.log(arrToProcess);
      arrToProcess.forEach(item => {
        const id = item.participantID;
        const keysInItem = Object.keys(item);
        const qKeys = 
          keysInItem.filter(k => k != "participantID" && k != "_id");
        
        if (ids.includes(id)) {
          // find that id in arr and update the item
          arr.forEach(ele => {
            if (ele.participantID == id) {
              const prevData = ele;
              qKeys.forEach(k => prevData[k] = item[k]);
              ele = prevData;
            }
          })
        } else {
          // make a new item, put it in arr, and put id in ids 
          const doc = {};
          doc["participantID"] = id;
          qKeys.forEach(k => doc[k] = item[k]);
          arr.push(doc);
          ids.push(id);
          // console.log(doc);
        }
      })
      // arr.map(ele => ele = this.flattenObj(ele));
      arr.map(ele => {
        const newEle = this.flattenObj(ele);
        const i = arr.indexOf(ele);
        arr[i] = newEle;
      });
      return arr;
    }
  }

  showJSONData() {
    const arr = this.makeArr();
    if (arr != null) {
      return arr.map(ele => {
        const line = JSON.stringify(ele);
        return (
          <div>
            <br/>
            {line}
          </div>
        )
      })
    }
  }

  // an action to fetch userData from APi for componentWillMount
  render() {
    const username = this.props.match.params.username;
    const studyName = this.props.match.params.studyName;
    const studyLink = "/" + username + "/" + studyName;
    const file_name = username + "_" + studyName + "_data.csv";
    const arr = this.makeArr();
    if (arr != null) {
      return (
        <div>
          <h2>All Participant Data from Study: {studyName}</h2>
          Back to <p> </p>
          <Link to={studyLink}>
            {studyName}
          </Link>
          <br /><br />
          <button>
            <CSVLink data={arr} filename={file_name}>
              Download Data as CSV
            </CSVLink>
          </button>
          {this.showJSONData()}
        </div>
      )
    } else {
      return (
        <div>
          <h2>All Participant Data from Study: {studyName}</h2>
          Back to <p> </p>
          <Link to={studyLink}>
            {studyName}
          </Link>
          <br /><br />
          It seems like there's no participant data yet... 
        </div>
      )
    }
    
  }
}

PartStudyData.propTypes = {
  // Proptype.type, the type here must match initialState of reducer
  getColsData: PropTypes.func.isRequired,
  getColNames: PropTypes.func.isRequired,
  colsData: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  colNames: PropTypes.array.isRequired
};

// interaction between reducer and store (state), connect to props 
// for components to use
const mapStateToProps = state => ({
  auth: state.auth,
  colsData: state.dataFlow.colsData,
  colNames: state.dataFlow.colNames,
});

export default connect(
  mapStateToProps,
  { getColNames, getColsData }
)(PartStudyData);