import React, { Component } from 'react';
import Dropzone, { useDropzone } from "react-dropzone";
import NormalCurve from './threshold.jsx';
import './HistSlider.css';

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
      this.processJSON = this.processJSON.bind(this);
  
      this.state = {
        dataReceived: false,
        fileNames: [],
        setFileNames: [],
        fileChosen: '',
        key: this.props.key
      };
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
      // this case is triggered when researchers select one of the three options
      // previously built for drag n drop file upload. 
      // Search 'dataReceived' in this file to learn more
      return (
        <div>
          <NormalCurve 
            data={this.state.jsonData} />
          <br/>
        </div>
      )
    // importing component
    } else{
      return( 
        <div>
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

export default NormalCurveResearch;