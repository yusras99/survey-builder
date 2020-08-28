import React, { Component } from 'react';
import Dropzone, { useDropzone } from "react-dropzone";
import Histogram from './Histogram.js';
import './HistogramResearch.css';
import '../../../../src/App.css';

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { 
  getColData
} from '../../../actions/dataActions'

class HistogramResearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataReceived: false,
      fileChosen: ''
    }

    this.delete = this.delete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleSelectedFile = this.handleSelectedFile.bind(this);
  }

  componentDidMount() {
    const username = this.props.auth.user.username;
    this.props.getColData(username, "itemData");
  }

  saveFile(type, name, content) {
    this.props.saveFile(type, name, content);
  }

  handleChange(key, value, count) {
    this.props.handleChange(key, value, count);
  }

  delete() {
    this.props.delete(this.props.count);
  }

  getCount() {
    this.props.getCount(this.props.count);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.name);
  }

  handleDrop(acceptedFiles) {
    console.log(acceptedFiles.map(file => {
      acceptedFiles.forEach((file) => {

        const normalCurveFiles = this.props.dataFlowColData.filter(
          item => item.itemType == "threshold");
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
                this.saveFile("threshold", file.name, jsonData);
              } else {
                const names = this.props.files.map(item => item.fileName);
                if (!names.includes(file.name)) {
                  this.saveFile("threshold", file.name, jsonData);
                }
              }
  
            this.setState({
              data: jsonData["data"],
              width: jsonData["width"],
              height: jsonData["height"],
              id: HistogramResearch,
              step: jsonData["step"],
              defaultValue: jsonData["defaultValue"],
              dataReceived: true,
              fileText: fileText,
              jsonData: jsonData["data"]
            });
          };
          reader.readAsText(file);
        };
      });
    }));
    this.setState({
      fileNames: acceptedFiles.map(file => file.name)
    });
  }

  handleSelectedFile() {
    this.handleChange("FileName", this.state.fileChosen, this.props.count);

    const jsonData = this.props.dataFlowColData.filter(item => 
      item.fileName == this.state.fileChosen)[0].fileContent;

    this.handleChange("FileContent", jsonData, this.props.count);

    this.setState({
      data: jsonData["data"],
      width: jsonData["width"],
      height: jsonData["height"],
      id: HistogramResearch,
      step: jsonData["step"],
      defaultValue: jsonData["defaultValue"],
      dataReceived: true,
      jsonData: jsonData["data"]
    });
  }  


  render() {
    if (this.state.dataReceived) {
      return (
        <div>
          <Histogram
            data={this.state.data}
            width={this.state.width}
            height={this.state.height}
            step={this.state.step}
            delete={this.delete}
            handleChange={this.handleChange}
            count={this.props.count}
            class="center" />
          <br />
        </div>
      )
    }
    else {
      const histogramFiles = this.props.dataFlowColData.filter(
        item => item.itemType == "threshold");
      console.log(histogramFiles);
      var fileNames = histogramFiles.map(item => item.fileName);
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

HistogramResearch.propTypes = {
  auth: PropTypes.object.isRequired,
  getColData: PropTypes.func.isRequired,
  dataFlowColData: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  dataFlowColData: state.dataFlow.colData
});

export default connect(
  mapStateToProps,
  { getColData }
)(HistogramResearch);