import React, { Component } from 'react';
import Dropzone, { useDropzone } from "react-dropzone";
import Tradeoff from './TradeoffThree.jsx';

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { 
  getColData
} from '../../../actions/dataActions'

class TradeoffResearch extends Component {
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
      this.handleChange = this.handleChange.bind(this);
  
      this.handleDrop = this.handleDrop.bind(this);
      this.processJSON = this.processJSON.bind(this);
  
      this.state = {
        dataReceived: false,
        fileNames: [],
        setFileNames: [],
        fileChosen: '',
        key: this.props.key
      };
    }

    handleChange(key, value, count) {
      this.props.handleChange(key, value, count);
    }

    componentDidMount() {
      // importing component
      // console.log(this.props)
      console.log(this.props.imported);
      if (this.props.imported) {
        // if this normal curve component is imported, we need to append those 
        // associating files to final output with handleChange()
        const jsonData = this.props.qToDisplay["FileContent"];
        this.handleChange("FileContent", jsonData, this.props.count);
        console.log(jsonData);
        this.setState({ imported: true });
        // this.processJSON(jsonData);
      }
      const username = this.props.auth.user.username;
      this.props.getColData(username, "itemData");
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
                dataReceived : "true",
                jsonData: jsonData
            });
            };
            reader.readAsText(file);
        });
      }));
      this.setState({ fileNames: acceptedFiles.map(file => file.name) })
    }

    processJSON(data){
        this.setState({
            dataReceived : "true",
            jsonData:data
        });
  }
  render(){
    if (this.state.dataReceived) {
      return (
        <div className="boxed">
          <Tradeoff
            data={this.state.jsonData}                  
            handleChange={this.handleChange} count = {this.props.count}
            />
          <br/>
        </div>
      )
    // importing component
    } else if (this.state.imported) {
      // a tradeoff question is imported in two possible ways:
      // 1. when researchers import a question from another experiment in expt builder
      // 2. when researchers use "Edit Experiment" feature from ConfigStudy

      return (
        <div>
          <Tradeoff 
            imported={true}
            editing={this.props.editing}
            data={this.props.qToDisplay["FileContent"]} 
            qToDisplay={this.props.qToDisplay}
            count={this.props.count}
            handleChange={this.handleChange} 
            delete={this.delete} />
        </div>
      )
    }
    console.log(this.state.imported);
      return( 
        <div className="boxed">
          Tradeoff Question
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
          TODO: delete question
        </div>
      )
    }
  }
TradeoffResearch.propTypes = {
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
)(TradeoffResearch);
