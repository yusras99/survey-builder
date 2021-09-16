import React, { Component } from 'react';
import Dropzone, { useDropzone } from "react-dropzone";
import GraphSlider from './GraphSlider.jsx';
import './GraphSlider.css';

class GraphSliderResearch extends Component {
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
        const jsonData = {};
        console.log(acceptedFiles.map(file => {
            acceptedFiles.forEach((file) => {

                const reader = new FileReader()
                reader.onabort = () => console.log('file reading was aborted')
                reader.onerror = () => console.log('file reading has failed')
                reader.onload = () => {
                    // Do whatever you want with the file contents
                    const fileText = reader.result;
                    //   const jsonData = JSON.parse(fileText);
                    // const lines = this.result.split('\n');
                    const lines = fileText.split('\n');
                    const names = lines[0].split(',');
                    const count = lines.length - 1;
                    const dataList = [];
                    const x_divide = 400.0 / names.length + 1;

                    // Dealing with points
                    for (var i = 1; i < names.length; i++) {
                        // console.log(names[i]);
                        dataList[i - 1] = {}
                        dataList[i - 1]["points"] = names.length - 1;
                        dataList[i - 1]["color"] = "green";
                        dataList[i - 1]["name"] = names[i];
                    }

                    // Adding x and y coordinates
                    for(var line = 1; line < count; line++){
                        // console.log(line);
                        const lineSplit = lines[line].split(',');
                        for (var word = 1; word < lineSplit.length; word++) {
                            // console.log(lineSplit[word]);
                            const yCoor = (parseFloat(lineSplit[word]) + 1.0) * 75;
                            const xCoor = (line - 1) * x_divide;
                            const point = {};
                            point["x"] = xCoor;
                            point["y"] = yCoor;
                            dataList[word - 1][(line - 1).toString()] = point;
                        }
                    }

                    // Adding each line to jsonData
                    for(var i = 0; i < names.length - 1; i++) {
                        jsonData[i.toString()] = dataList[i];
                    }

                    const outData = {}
                    outData['pointsData'] = jsonData;
                    outData['title'] = "Title";

                    this.setState({
                        dataReceived : "true",
                        jsonData: outData
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
          <GraphSlider 
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
                accept=".csv"
            // onDrop={(accepted, rejected) => { this.setState({ accepted, rejected });
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

export default GraphSliderResearch;
