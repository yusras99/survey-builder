import React, { Component } from 'react';
import Dropzone, { useDropzone } from "react-dropzone";
import Histogram from './Histogram.js';
import './HistogramResearch.css';
import '../../../../src/App.css';

class HistogramResearch extends Component {
  constructor(props) {
    super(props);

    this.handleDrop = this.handleDrop.bind(this);

    this.state = {
      dataReceived: false
    }

    this.delete = this.delete.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(key, value, count) {
    this.props.handleChange(key, value, count);
  }

  delete() {
    this.props.delete(this.props.count);
  }

  handleDrop(acceptedFiles) {
    console.log(acceptedFiles.map(file => {
      acceptedFiles.forEach((file) => {

        const reader = new FileReader()
        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = () => {
          // Do whatever you want with the file contents
          const fileText = reader.result;
          const jsonData = JSON.parse(fileText);

          this.setState({
            data: jsonData["data"],
            width: jsonData["width"],
            height: jsonData["height"],
            id: HistogramResearch,
            step: jsonData["step"],
            defaultValue: jsonData["defaultValue"],
            dataReceived: true
          });
        };
        reader.readAsText(file);
      });
    }));
    this.setState({
      fileNames: acceptedFiles.map(file => file.name)
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
      return (
        <div className="boxed">
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

export default HistogramResearch;