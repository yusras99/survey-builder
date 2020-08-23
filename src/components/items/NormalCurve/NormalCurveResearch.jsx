import React, { Component } from 'react';
import Dropzone, { useDropzone } from "react-dropzone";
import NormalCurve from './NormalCurve';
import './NormalCurve.css';

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

    this.handleDrop = this.handleDrop.bind(this);
    this.handleSelectedFile = this.handleSelectedFile.bind(this);
    this.onChange = this.onChange.bind(this);
    this.changeJSON = this.changeJSON.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      dataReceived: false,
      fileNames: [],
      setFileNames: [],
      fileChosen: '',
      key: this.props.key
    };
  }

  componentDidMount() {
    // importing component
    if (this.props.imported) {
      this.handleChange("FileName", this.props.qToDisplay["FileName"], this.props.count);
      this.handleChange("FileContent", this.props.qToDisplay["FileContent"], this.props.count);
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
    this.handleChange("FileName", this.state.fileChosen, this.props.count);

    const jsonData = this.props.dataFlowColData.filter(item => 
      item.fileName == this.state.fileChosen)[0].fileContent;

    this.handleChange("FileContent", jsonData, this.props.count);

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
    })
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
    data[key] = Number(value);
    this.handleChange("FileContent", data, this.props.count);
  }

  render() {
    if (this.state.dataReceived) {
      return (
        <div>
          <NormalCurve 
            data={this.state.jsonData} count={this.props.count}
            changeJSON={this.changeJSON} 
            handleChange={this.handleChange} />
          <br/>
        </div>
      )
    // importing component
    } else if (this.props.imported) {
      return (
        <div>
          <NormalCurve 
            imported={true}
            data={this.props.qToDisplay["FileContent"]} 
            qToDisplay={this.props.qToDisplay}
            count={this.props.count}
            changeJSON={this.changeJSON} 
            handleChange={this.handleChange} />
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
        <div className="boxed">
          Select previously uploaded files: 
          <br/>
          <select name="fileChosen" value={this.state.fileChosen} onChange={this.onChange}>
            {fileOptions}
          </select>
          <button onClick={this.handleSelectedFile}>OK</button>
          <br/>
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