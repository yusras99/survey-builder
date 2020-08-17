import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CSVLink } from "react-csv";

import {
  getColData,
  getStudyInfo
} from "../../actions/dataActions"

import "./PartData.css";

class PartExptData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // finalObj: {}
    };

    this.makeArr = this.makeArr.bind(this);
    this.showJSONData = this.showJSONData.bind(this);
    this.getIndex = this.getIndex.bind(this);
  }

  componentWillMount() {
    const username = this.props.match.params.username;
    const studyName = this.props.match.params.studyName;
    const exptName = this.props.match.params.exptName;
    const colName = studyName + "-" + exptName;
    this.props.getColData(username, colName);
    this.props.getStudyInfo(username, studyName);
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
    if (!Object.keys(this.props.colData).length == 0) {
      // console.log(this.props.colData);
      var arr = [];
      var ids = [];
      const arrToProcess = this.props.colData;
      console.log(arrToProcess);
      arrToProcess.forEach(item => {
        const id = item.participantID;
        const keysInItem = Object.keys(item);
        // switch statement here
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

  getIndex() {
    const exptName = this.props.match.params.exptName;
    if (!this.props.experiments.length == 0) {
      const thisExpt = 
      this.props.experiments
        .filter(item => item["exptName"] == this.props.match.params.exptName)[0]
      const index = thisExpt["index"];

      let str = ""
      const objKeys = Object.keys(index);
      objKeys.map(key => {
        const line = key.toString() + ": " + index[key].toString() + "\n"
        str += line;
      });

      const element = document.createElement("a");
      const file = new Blob([str], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = exptName + "Legend.txt";
      document.body.appendChild(element); 
      element.click();
      console.log(file);
    }
  }

  // an action to fetch userData from APi for componentWillMount
  render() {
    const username = this.props.match.params.username;
    const studyName = this.props.match.params.studyName;
    const exptName = this.props.match.params.exptName;
    const studyLink = "/" + username + "/" + studyName;
    const file_name = username + "_" + studyName + "_" + exptName + "_data.csv";
    const arr = this.makeArr();
    if (arr != null) {
      console.log(arr);
      return (
        <div>
          <h2>Experiment: {exptName}</h2>
          Back to <p> </p>
          <Link to={studyLink}>
            {studyName}
          </Link>
          <br/>
          <h4>Participants data: </h4> 
          {/* <button onClick={this.downloadData}>See data as csv</button> */}
          <button>
            <CSVLink data={arr} filename={file_name}>
              Download Data as CSV
            </CSVLink>
          </button>
          <br/><br/>
          <button onClick={this.getIndex}>Download Legend</button><br/>
          
          <div>
            {this.showJSONData()}
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <h2>Experiment: {this.props.match.params.exptName}</h2>
          Back to <p> </p>
          <Link to={studyLink}>
            {studyName}
          </Link>
          <br/><br/>
          It seems like there's no participant data yet...
        </div>
      )
    }
  }
}

PartExptData.propTypes = {
  // Proptype.type, the type here must match initialState of reducer
  getColData: PropTypes.func.isRequired,
  colData: PropTypes.array.isRequired,

  getStudyInfo: PropTypes.array.isRequired,
  experiments: PropTypes.array.isRequired,

  auth: PropTypes.object.isRequired
};

// interaction between reducer and store (state), connect to props 
// for components to use
const mapStateToProps = state => ({
  auth: state.auth,
  colData: state.dataFlow.colData,
  experiments: state.dataFlow.studyInfo
});

export default connect(
  mapStateToProps,
  { getColData, getStudyInfo }
)(PartExptData);