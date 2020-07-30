import React, { Component } from 'react';
import Dropzone, { useDropzone } from "react-dropzone";
import './NormalCurve.css';

import PropTypes from "prop-types";
import { connect } from "react-redux";

// You might need to change the folder path
import { 
  getColData
} from '../../actions/dataActions'

class Template extends Component {
  constructor(props) {
    super(props);

    // Add createRefs 
    // Add function bindings here. Example: this.method = this.method.bind(this)

    this.state = {  
      // Add more variables related to how you process frontend data
      dataReceived: false,
      fileNames: [],
      setFileNames: [],
      fileChosen: ''
    };
  }

  componentDidMount() {
    const username = this.props.auth.user.username;
    // getting previously uploaded JSON objects
    this.props.getColData(username, "itemData");
  }

  // just using this.props.saveFile() is enough. However, we put this 
  // function here just so we don't forget we can use this function
  // Action: the parent component ("TabList.jsx") will append file info to its 
  //         state, then it will send all file info upon submission  
  saveFile(type, name, content) {
    this.props.saveFile(type, name, content);
  }

  // just using this.props.saveFile() is enough. However, we put this 
  // function here just so we don't forget we can use this function
  // Action: the parent component ("TabList.jsx") will store information 
  //         associated with a specific question into the final output data
  handleChange(type, q, count) {
    this.props.handleChange(type, q, count);
  }

  // if psych researcher uploads a JSON file via dropzone
  handleDrop(acceptedFiles) {
    if (acceptedFiles) {
      console.log(acceptedFiles.map(file => {
        acceptedFiles.forEach((file) => {
          this.handleChange("FileName", file.name, this.props.count);
          const reader = new FileReader();
          reader.onabort = () => console.log('file reading was aborted')
          reader.onerror = () => console.log('file reading has failed')
          reader.onload = () => {
            const fileText = reader.result;
            const jsonData = JSON.parse(fileText);
            // store the JSON file content into this question.
            // participant-app will have access to this data to display 
            // each experiment question 
            this.handleChange("FileContent", jsonData, this.props.count);
            if (this.props.files.length == 0) {
              // ###TODO###
              // change "template" to some other name that you'd prefer
              this.saveFile("template", file.name, jsonData);
            } else {
              const names = this.props.files.map(item => item.fileName);
              if (!names.includes(file.name)) {
                // ###TODO###
                // change "template" to some other name that you'd prefer
                this.saveFile("template", file.name, jsonData);
              }
            }
            // process file information
            this.setState({
              dataReceived: true,
              // Add more variables related to how you process frontend data
            })
          }
          reader.readAsText(file)
        })
      }));
    }
    this.setState({ fileNames: acceptedFiles.map(file => file.name) })
  }

  // if researchers select a previously uploaded JSON file from dropdown menu
  handleSelectedFile() {
    // store the JSON file name into this question.
    // participant-app will have access to this data to display 
    // each experiment question 
    this.handleChange("FileName", this.state.fileChosen, this.props.count);
    // locate the file from fileName 
    // (fileName must be unique when researchers upload file)
    const jsonData = this.props.dataFlowColData.filter(item => 
      item.fileName == this.state.fileChosen)[0].fileContent;
    // store the JSON file content into this question.
    // participant-app will have access to this data to display 
    // each experiment question 
    this.handleChange("FileContent", jsonData, this.props.count);
    this.setState({
      dataReceived: true,
      // Add more variables related to how you process frontend data
    })
  }

  // REQUIRED from parent component (TabList.jsx)
  delete() {
    this.props.delete(this.props.count);
  }

  // REQUIRED from parent component (TabList.jsx)
  getCount() {
    this.props.getCount(this.props.count);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    if (this.state.dataReceived) {
      return (
        <form>
          <p>
            Question: <p></p>
            <input type="text" ref={this.qRef} 
              onInput={() => this.handleChange("Question", this.qRef.current.value, this.props.count)}/>
          </p><br/><br/>
          {/* Display your experiment type so that researchers know what 
            item they are making */}
          <button onClick={this.delete.bind(this)}>Delete this Question</button>
          <br/><br/>
        </form>
      )
    }
    else {
      // implement a dropdown menu by filtering through data gotten from 
      // database to get fileNames 
      // ###TODO###: change templateFiles and "template" to the name of your
      //             component
      const templateFiles = this.props.dataFlowColData.filter(
        item => item.itemType == "template");
      var fileNames = templateFiles.map(item => item.fileName);
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

Template.propTypes = {
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
)(Template);