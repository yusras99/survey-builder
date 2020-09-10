import React, { Component } from 'react';
import Dropzone, { useDropzone } from "react-dropzone";
import NormalCurve from './NormalCurve';
import './NormalCurve.css';

import sameSquare from './sameSquare.png';
import sameSquareJSON from './sameSquare.json';
import rlyDiff from './rlyDiff.png';
import rlyDiffJSON from './rlyDiff.json';
import bigSmall from './bigSmall.png';
import bigSmallJSON from './bigSmall.json';

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { 
  getColData
} from '../../../actions/dataActions'

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
    if (this.props.imported) {
      this.handleChange("FileName", this.props.qToDisplay["FileName"], this.props.count);
      const jsonData = this.props.qToDisplay["FileContent"];
      this.handleChange("FileContent", jsonData, this.props.count);

      this.processJSON(jsonData);
    }
    const username = this.props.auth.user.username;
    this.props.getColData(username, "itemData");
  }

  saveFile(type, name, content) {
    this.props.saveFile(type, name, content);
  }

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

  handleChange(key, value, count) {
    this.props.handleChange(key, value, count);
  }

  changeJSON(key, value) {
    var data = this.state.jsonData;
    data[key] = value;
    this.handleChange("FileContent", data, this.props.count);
  }

  selectNC(e) {
    const id = e.currentTarget.id;

    var jsonData;
    var configArgs;
    switch (id) {
      case "sameSquare":
        jsonData = {
          "colValHeiS": {
            "0": 1,
            "1": 1,
            "2": 2,
            "3": 4,
            "4": 6,
            "5": 9,
            "6": 12,
            "7": 16,
            "8": 18,
            "9": 20,
            "10": 20,
            "11": 18,
            "12": 16,
            "13": 12,
            "14": 9,
            "15": 6,
            "16": 4,
            "17": 2,
            "18": 1,
            "19": 1
          },
          "colValHeiS2": {
            "0": 1,
            "1": 1,
            "2": 2,
            "3": 4,
            "4": 6,
            "5": 9,
            "6": 12,
            "7": 16,
            "8": 18,
            "9": 20,
            "10": 20,
            "11": 18,
            "12": 16,
            "13": 12,
            "14": 9,
            "15": 6,
            "16": 4,
            "17": 2,
            "18": 1,
            "19": 1
          },
          "len1": 20,
          "len2": 20,
          "overlapVals": {
            "0": 1,
            "1": 2,
            "2": 3,
            "3": 4,
            "4": 6,
            "5": 8,
            "6": 12,
            "7": 16,
            "8": 22,
            "9": 28,
            "10": 37,
            "11": 46,
            "12": 58,
            "13": 70,
            "14": 86,
            "15": 102,
            "16": 120,
            "17": 138,
            "18": 158,
            "19": 178,
            "20": 158,
            "21": 138,
            "22": 120,
            "23": 102,
            "24": 86,
            "25": 70,
            "26": 58,
            "27": 46,
            "28": 37,
            "29": 28,
            "30": 22,
            "31": 16,
            "32": 12,
            "33": 8,
            "34": 6,
            "35": 4,
            "36": 3,
            "37": 2,
            "38": 1
          },
          "max-height": 20,
          "circle-radius": 3,
          "axis-length": 30,
          "startPos1": 21,
          "startPos2": 44,
          "lowVal": 0
        };
        configArgs = [20, 20, 20, 20, 3, 30, 0];
        console.log("sameSquare");
        break;
      case "rlyDiff":
        jsonData = {
          "colValHeiS": {
            "0": 1,
            "1": 5,
            "2": 12,
            "3": 22,
            "4": 30,
            "5": 30,
            "6": 22,
            "7": 12,
            "8": 5,
            "9": 1
          },
          "colValHeiS2": {
            "0": 1,
            "1": 1,
            "2": 1,
            "3": 2,
            "4": 2,
            "5": 3,
            "6": 4,
            "7": 5,
            "8": 6,
            "9": 7,
            "10": 8,
            "11": 8,
            "12": 9,
            "13": 10,
            "14": 10,
            "15": 10,
            "16": 10,
            "17": 9,
            "18": 8,
            "19": 8,
            "20": 7,
            "21": 6,
            "22": 5,
            "23": 4,
            "24": 3,
            "25": 2,
            "26": 2,
            "27": 1,
            "28": 1,
            "29": 1
          },
          "len1": 10,
          "len2": 30,
          "overlapVals": {
            "0": 1,
            "1": 2,
            "2": 3,
            "3": 4,
            "4": 6,
            "5": 8,
            "6": 11,
            "7": 15,
            "8": 20,
            "9": 25,
            "10": 30,
            "11": 36,
            "12": 42,
            "13": 48,
            "14": 54,
            "15": 60,
            "16": 64,
            "17": 67,
            "18": 69,
            "19": 70,
            "20": 69,
            "21": 67,
            "22": 64,
            "23": 60,
            "24": 54,
            "25": 48,
            "26": 42,
            "27": 36,
            "28": 30,
            "29": 25,
            "30": 20,
            "31": 15,
            "32": 11,
            "33": 8,
            "34": 6,
            "35": 4,
            "36": 3,
            "37": 2,
            "38": 1
          },
          "max-height": 30,
          "circle-radius": 3,
          "axis-length": 30,
          "startPos1": 31,
          "startPos2": 44,
          "lowVal": 0
        };
        configArgs = [30, 10, 10, 30, 3, 30, 0];
        console.log("rlyDiff");
        break;
      case "bigSmall":
        jsonData = {
          "colValHeiS": {
            "0": 1,
            "1": 2,
            "2": 5,
            "3": 10,
            "4": 16,
            "5": 23,
            "6": 28,
            "7": 30,
            "8": 28,
            "9": 23,
            "10": 16,
            "11": 10,
            "12": 5,
            "13": 2,
            "14": 1
          },
          "colValHeiS2": {
            "0": 1,
            "1": 3,
            "2": 8,
            "3": 15,
            "4": 20,
            "5": 20,
            "6": 15,
            "7": 8,
            "8": 3,
            "9": 1
          },
          "len1": 15,
          "len2": 10,
          "overlapVals": {
            "0": 1,
            "1": 2,
            "2": 4,
            "3": 7,
            "4": 12,
            "5": 20,
            "6": 30,
            "7": 45,
            "8": 61,
            "9": 81,
            "10": 94,
            "11": 94,
            "12": 94,
            "13": 94,
            "14": 81,
            "15": 61,
            "16": 45,
            "17": 30,
            "18": 20,
            "19": 12,
            "20": 7,
            "21": 4,
            "22": 2,
            "23": 1
          },
          "max-height": 30,
          "circle-radius": 3,
          "axis-length": 30,
          "startPos1": 11,
          "startPos2": 29,
          "lowVal": 0
        };
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
    } else if (this.props.imported) {
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
      const normalCurveFiles = this.props.dataFlowColData.filter(
        item => item.itemType == "normal-curve");
      var fileNames = normalCurveFiles.map(item => item.fileName);
      fileNames.unshift("Select File");
      const renderOption = item => <option value={item}>{item}</option>
      const fileOptions = fileNames.map(renderOption);

      return (
        <div>
          <div className="boxed">
            Select one of the following Normal Curve items to configure: <br/><br/>
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