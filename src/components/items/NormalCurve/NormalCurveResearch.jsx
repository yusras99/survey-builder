import React, { Component } from 'react';
import Dropzone, { useDropzone } from "react-dropzone";
import NormalCurve from './NormalCurve';
import './NormalCurve.css';

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { 
  getColData
} from '../../../actions/dataActions'

import sameSquare from './sameSquare.png';
import rlyDiff from './rlyDiff.png';
import bigSmall from './bigSmall.png';
const sameSquareData = require('./sameSquare.json');
const rlyDiffData = require('./rlyDiff.json');
const bigSmallData = require('./bigSmall.json');

class NormalCurveResearch extends Component {
  constructor(props) {
    super(props);

    this.rectRef = React.createRef();
    this.svgRef = React.createRef();
    this.areaRef = React.createRef();

    this.arg1ref = React.createRef();
    this.arg2ref = React.createRef();
    this.arg3ref = React.createRef();
    this.arg4ref = React.createRef();
    this.arg5ref = React.createRef();
    this.arg6ref = React.createRef();
    this.arg7ref = React.createRef();

    this.handleDrop = this.handleDrop.bind(this);
    this.handleSelectedFile = this.handleSelectedFile.bind(this);
    this.onChange = this.onChange.bind(this);
    this.changeJSON = this.changeJSON.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.delete = this.delete.bind(this);
    this.processJSON = this.processJSON.bind(this);
    this.selectNC = this.selectNC.bind(this);

    this.state = {
      dataReceived: false,
      fileNames: [],
      setFileNames: [],
      fileChosen: '',
      key: this.props.key
    };
  }

  /**
   * Set this.state to display config data as graphs to the frontend
   * @param {[Object]} jsonData [json data containing config info for normalCurve]
   */
  processJSON(jsonData) {
    const unitHeight = jsonData["max-height"];
    const circRad = jsonData["circle-radius"];
    const distancing = circRad * 4 - 1;
    const height = (Math.ceil((distancing * unitHeight) / 50) + 1) * 50;
    const ceilDist = height - 50;
    const length = Math.ceil((distancing * jsonData["len1"] * 2 + distancing * jsonData["len2"] * 2) / 100) * 100;
    const colNum = Math.round(length / distancing);
    this.setState({
      dataReceived: true,
      // fileText: fileText,
      jsonData: jsonData,
      svgWidth: length,
      svgHeight: height,
      distancing: distancing,
      dataReceived: true,
      len1: jsonData["len1"],
      colValHeiS: jsonData["colValHeiS"],
      len2: jsonData["len2"],
      colValHeiS2: jsonData["colValHeiS2"],
      distancing1: (jsonData["len2"] + 1) * distancing,
      distancing2: (jsonData["len1"] + jsonData["len2"] + 4) * distancing,
      triCent1: Math.round((0.5 * jsonData["len1"]) * distancing) + distancing,
      triCent2: Math.round((0.5 * jsonData["len2"]) * distancing) + distancing,
      col11: jsonData["len2"] + 1,
      col12: jsonData["len1"] + jsonData["len2"] + 1,
      col21: jsonData["len1"] + jsonData["len2"] + 3,
      col22: jsonData["len1"] + 2 * jsonData["len2"] + 3,
      colLim1: Math.round((length - (jsonData["len1"] * distancing)) / distancing),
      colLim2: Math.round((length - (jsonData["len2"] * distancing)) / distancing),
      overlapVals: jsonData["overlapVals"],
      circRad: circRad,
      ceilDist: ceilDist
    });
  }

  componentDidMount() {
    // importing component
    // console.log(this.props);
    if (this.props.imported) {
      // if this normal curve component is imported, we need to append those 
      // associating files to final output with handleChange()
      this.handleChange("FileName", this.props.qToDisplay["FileName"], this.props.count);
      const jsonData = this.props.qToDisplay["FileContent"];
      this.handleChange("FileContent", jsonData, this.props.count);
      this.setState({ imported: true });
      // this.processJSON(jsonData);
    }
    const username = this.props.auth.user.username;
    this.props.getColData(username, "itemData");
  }

  // Inherited function from TabList.jsx
  saveFile(type, name, content) {
    this.props.saveFile(type, name, content);
  }

  /**
   * DEPRECATED since we are not doing drag n drop anymore
   * Set this.state based on file data and save file data to final output
   * @param {[File]} acceptedFiles [a file in .json format]
   */
  handleDrop(acceptedFiles) {
    console.log(acceptedFiles.map(file => {
      acceptedFiles.forEach((file) => {

        const normalCurveFiles = this.props.dataFlowColData.filter(
          item => item.itemType == "normal-curve");
        var fileNames = normalCurveFiles.map(item => item.fileName);
        if (fileNames.includes(file.name)) {
          alert("File name already exists. Please upload a file" +  
            " with a unique name.");
          this.setState({ dataReceived: false });
        } else {
          this.handleChange("FileName", file.name, this.props.count);

          const reader = new FileReader()
          reader.onabort = () => console.log('file reading was aborted')
          reader.onerror = () => console.log('file reading has failed')
          reader.onload = () => {
            // Do whatever you want with the file contents
            const fileText = reader.result;
            const jsonData = JSON.parse(fileText);

            this.handleChange("FileContent", jsonData, this.props.count);
            if (this.props.files.length == 0) {
              this.saveFile("normal-curve", file.name, jsonData);
            } else {
              const names = this.props.files.map(item => item.fileName);
              if (!names.includes(file.name)) {
                this.saveFile("normal-curve", file.name, jsonData);
              }
            }

            const unitHeight = jsonData["max-height"];
            const circRad = jsonData["circle-radius"];
            const distancing = circRad * 4 - 1;
            const height = (Math.ceil((distancing * unitHeight) / 50) + 1) * 50;
            const ceilDist = height - 50;
            const length = Math.ceil((distancing * jsonData["len1"] * 2 + distancing * jsonData["len2"] * 2) / 100) * 100;
            const colNum = Math.round(length / distancing);
            this.setState({
              dataReceived: true,
              fileText: fileText,
              jsonData: jsonData, 
              svgWidth: length,
              svgHeight: height,
              distancing: distancing,
              dataReceived: true,
              len1: jsonData["len1"],
              colValHeiS: jsonData["colValHeiS"],
              len2: jsonData["len2"],
              colValHeiS2: jsonData["colValHeiS2"],
              distancing1: (jsonData["len2"] + 1) * distancing,
              distancing2: (jsonData["len1"] + jsonData["len2"] + 4) * distancing,
              triCent1: Math.round((0.5 * jsonData["len1"]) * distancing) + distancing,
              triCent2: Math.round((0.5 * jsonData["len2"]) * distancing) + distancing,
              col11: jsonData["len2"] + 1,
              col12: jsonData["len1"] + jsonData["len2"] + 1,
              col21: jsonData["len1"] + jsonData["len2"] + 3,
              col22: jsonData["len1"] + 2 * jsonData["len2"] + 3,
              colLim1: Math.round((length - (jsonData["len1"] * distancing)) / distancing),
              colLim2: Math.round((length - (jsonData["len2"] * distancing)) / distancing),
              overlapVals: jsonData["overlapVals"],
              circRad: circRad,
              ceilDist: ceilDist
            });
          };
          reader.readAsText(file);
        };
      });
    }));
    this.setState({ fileNames: acceptedFiles.map(file => file.name) })
  }

  /**
   * DEPRECATED since we are not doing drag n drop anymore
   * Triggered when researchers select a previously uploaded file
   */
  handleSelectedFile() {
    console.log(this.props.count);
    this.handleChange("FileName", this.state.fileChosen, this.props.count);

    const jsonData = this.props.dataFlowColData.filter(item => 
      item.fileName == this.state.fileChosen)[0].fileContent;

    this.handleChange("FileContent", jsonData, this.props.count);
    
    this.processJSON(jsonData);
  }  

  delete() {
    this.props.delete(this.props.count);
  }

  getCount() {
    this.props.getCount(this.props.count);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // inherited from TabList.jsx
  handleChange(key, value, count) {
    this.props.handleChange(key, value, count);
  }

  /**
   * Update @param data and save to final output
   * This function is specifically designed to change the shape ocnfiguration
   * data for the normal curve component. 
   * @param {[String]} key [key of entry to update]
   * @param {[Any]} value [value of entry to update]
   * @param {[Object]} data [a json object to be updated]
   */
  changeJSON(key, value, data) {
    // var data = this.state.jsonData;
    data[key] = value;
    this.handleChange("FileContent", data, this.props.count);
  }

  /**
   * Save researcher selection to final output and update this.state
   * WARNING: do not try to import jsonData from directory because data
   *          will be altered by researchers' configuration
   * @param {[Event]} e [an event triggered by researchers clicking on one of 
   *                     the three normal curve options]
   */
  selectNC(e) {
    const id = e.currentTarget.id;

    var jsonData;
    var configArgs;
    switch (id) {
      case "sameSquare":
        jsonData = sameSquareData;
        configArgs = [20, 20, 20, 20, 3, 30, 0];
        console.log("sameSquare");
        break;
      case "rlyDiff":
        jsonData = rlyDiffData;
        configArgs = [30, 10, 10, 30, 3, 30, 0];
        console.log("rlyDiff");
        break;
      case "bigSmall":
        jsonData = bigSmallData;
        configArgs = [30, 15, 20, 10, 3, 30, 0];
        console.log("bigSmall");
        break;
    };

    this.handleChange("FileName", id + ".json", this.props.count);
    this.handleChange("FileContent", jsonData, this.props.count);
    this.setState({ configArgs: configArgs });
    this.processJSON(jsonData);
  }

  render() {
    if (this.state.dataReceived) {
      // this case is triggered when researchers select one of the three options
      // previously built for drag n drop file upload. 
      // Search 'dataReceived' in this file to learn more
      return (
        <div>
          <NormalCurve 
            data={this.state.jsonData} count={this.props.count}
            configArgs={this.state.configArgs}
            changeJSON={this.changeJSON} 
            handleChange={this.handleChange} 
            delete={this.delete} />
          <br/>
        </div>
      )
    // importing component
    } else if (this.state.imported) {
      // a normal curve is imported in two possible ways:
      // 1. when researchers import a question from another experiment in expt builder
      // 2. when researchers use "Edit Experiment" feature from ConfigStudy
      return (
        <div>
          <NormalCurve 
            imported={true}
            editing={this.props.editing}
            data={this.props.qToDisplay["FileContent"]} 
            qToDisplay={this.props.qToDisplay}
            count={this.props.count}
            changeJSON={this.changeJSON} 
            handleChange={this.handleChange} 
            delete={this.delete} />
        </div>
      )
    } else {
      // provide researchers with three pre-built normal curve items
      const normalCurveFiles = this.props.dataFlowColData.filter(
        item => item.itemType == "normal-curve");
      var fileNames = normalCurveFiles.map(item => item.fileName);
      fileNames.unshift("Select File");
      const renderOption = item => <option value={item}>{item}</option>
      const fileOptions = fileNames.map(renderOption);

      return (
        <div>
          <div className="boxed">
            Select one of the following Normal Curve items to start with: <br/><br/>
            <div className="container">
              <button>
                <img src={sameSquare} alt="sameSquare" id="sameSquare"
                  onClick={this.selectNC}
                  style={{ height: "10vw", width: "10vw" }} /> 
              </button>
              <p> </p>
              <button>
                <img src={rlyDiff} alt="rlyDiff" id="rlyDiff"
                  onClick={this.selectNC}
                  style={{ height: "10vw", width: "10vw" }} /> 
              </button>
              <p> </p>
              <button>
                <img src={bigSmall} alt="bigSmall" id="bigSmall" 
                  onClick={this.selectNC}
                  style={{ height: "10vw", width: "10vw" }} /> 
              </button>
              <br/>
            </div>
            <br/><br/>
            {/* Select previously uploaded files: 
            <br/>
            <select name="fileChosen" value={this.state.fileChosen} onChange={this.onChange}>
              {fileOptions}
            </select>
            <button onClick={this.handleSelectedFile}>OK</button>
            <br/><br/> */}
            {/* <br/>
            <Dropzone
              onDrop={this.handleDrop}
              accept="application/JSON, .json"
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <p>Drag'n'drop files, or click to select files (must be valid JSON file)</p>
                </div>
              )}
            </Dropzone>
            <br/> */}
            <button onClick={this.delete.bind(this)}>Delete Question</button>
          </div>
          <br/><br/>
        </div>
      )
    }
  }
}

NormalCurveResearch.propTypes = {
  auth: PropTypes.object.isRequired,
  getColData: PropTypes.func.isRequired,
  dataFlowColData: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  dataFlowColData: state.dataFlow.colData
});

export default connect(
  mapStateToProps,
  { getColData }
)(NormalCurveResearch);