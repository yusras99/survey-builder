import React, { Component } from 'react';
import Dropzone, { useDropzone } from "react-dropzone";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { 
  getColData
} from '../../../actions/dataActions'

const thumbsContainer = {
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

class StaticText extends Component {
  constructor(props) {
    super(props);
    this.qRef = React.createRef();
    this.keyRef = React.createRef();

    this.state = {
      images: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
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

  handleChange(type, q, count) {
    this.props.handleChange(type, q, count);
  }

  getBase64(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // callback happens here
      const imag = {
        'content': reader.result,
        'preview': URL.createObjectURL(file)
      }
      this.setState({ images: [...this.state.images, imag] });
    };
    reader.onerror = function (error) {
      alert("An error occured. Please refresh the page.");
      console.log('Error: ', error);
    };
  }

  handleDrop(acceptedFiles) {
    console.log(acceptedFiles.map(file => {
      acceptedFiles.forEach((file) => {
        // const normalCurveFiles = this.props.dataFlowColData.filter(
        //   item => item.itemType == "threshold");
        // var fileNames = normalCurveFiles.map(item => item.fileName);
        // if (fileNames.includes(file.name)) {
        if (false) {
          alert("File name already exists. Please upload a file" +  
            " with a unique name.");
          this.setState({ dataReceived: false });
        } else {
          this.handleChange("FileName", file.name, this.props.count);
          console.log(file.name);
          console.log(file);

          let base64str = '';
          this.getBase64(file, (result) => {
            base64str = result;
            console.log(base64str);
          })

          // const reader = new FileReader()
          // reader.onabort = () => console.log('file reading was aborted')
          // reader.onerror = () => console.log('file reading has failed')
          // reader.onload = () => {
          //   // Do whatever you want with the file contents
          //   const fileText = reader.result;
          //   // const jsonData = JSON.parse(fileText);

          //   // this.handleChange("FileContent", jsonData, this.props.count);
          //   // if (this.props.files.length == 0) {
          //   //   this.saveFile("threshold", file.name, jsonData);
          //   // } else {
          //   //   const names = this.props.files.map(item => item.fileName);
          //   //   if (!names.includes(file.name)) {
          //   //     this.saveFile("threshold", file.name, jsonData);
          //   //   }
          //   // }
        };
      });
    }));
    // this.setState({
    //   fileNames: acceptedFiles.map(file => file.name)
    // });
  }

  componentDidMount() {
    // NOTE: import includes both "import question from another experiment" and
    //       "Edit experiment"
    if (this.props.imported) {
      // we only want to show the actual content because the question is imported 
      // (researchers may want to use different csv column names)
      this.handleChange("Static Text", this.props.qToDisplay["Static Text"], this.props.count);
    }; 
    if (this.props.editing) {
      // we want to show previous csv column names because researchers want to make edits
      this.handleChange("static-text-key", this.props.qToDisplay["static-text-key"], this.props.count);
    }; 
  }

  render() {
    const qNum = this.props.count + 1;
    var Images = ({sth}) => <img src={''} />
    if (this.state.images.length != 0) {
      console.log(this.state);
      Images = ({sth}) => (
        <div>
          {
            this.state.images.map(imag => (
              <div style={thumb}>
                <div style={thumbInner}>
                  <img src={imag.preview} style={{ height: "100%", width: "100%" }}/>
                </div>
              </div>
            ))
          }
        </div>
      )
    }
    return (
      <div>
        <div className="boxed">
          <br/>
          Question #{qNum} 
          <br/>
          Enter your static text below: <br/>
          {
            this.props.imported
            ?
            <textarea cols="60" rows="10" ref={this.qRef} 
            defaultValue={this.props.qToDisplay["Static Text"]}
            onInput={() => this.handleChange("Static Text", this.qRef.current.value, this.props.count)}>
            </textarea>
            :
            <textarea cols="60" rows="10" ref={this.qRef} 
            onInput={() => this.handleChange("Static Text", this.qRef.current.value, this.props.count)}>
            </textarea>
          }
          <br/><br/>
          Add image(s):
          <Dropzone
            onDrop={this.handleDrop}
            accept="image/jpeg, image/png"
            >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <p>Drag'n'drop files, or click to select files (must be .jpg or .png)</p>
              </div>
            )}
          </Dropzone>
          <div style={thumbsContainer}>
            <Images data={''} />
          </div>
          <br/>
          What csv column name do you want to assign to this question? <br/>
          <b>Please use letters only, the name must be unique, leave no space between letters.</b> <br/>
          Recommedation: include your experiment name, this question number 
          ({qNum}), and the question type (staticText)
          <br/>
          {
            this.props.editing 
            ? 
            <input type="text" ref={this.keyRef} 
            defaultValue={this.props.qToDisplay["static-text-key"]}
            onInput={() => this.handleChange("static-text-key", this.keyRef.current.value, this.props.count)}/>
            :
            <input type="text" ref={this.keyRef} 
            onInput={() => this.handleChange("static-text-key", this.keyRef.current.value, this.props.count)}/>
          }
          <br/><br/>
          <button onClick={this.delete.bind(this)}>Delete</button>
        </div>
        <br/><br/><br/><br/>
      </div>
    )
  }
}

export default StaticText;