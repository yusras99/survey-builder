import React, { Component, useCallback } from 'react';
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

const thumbWithDelete = {
  display: 'inline-block',
  justifyContent: 'center',
  alignItems: 'center'
}

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
    this.imageRef = React.createRef();

    this.state = {
      images: [],
      names: [],
      count: 0
    }

    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.onDeleteImage = this.onDeleteImage.bind(this);
    this.handleImageURL = this.handleImageURL.bind(this);
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

  onDeleteImage(e) {
    // update both state and finalObj
    const arrRemovedImg = this.state.images.filter(imag => imag.name != e.target.id);
    this.setState({ images: arrRemovedImg });
    this.handleChange("Images", arrRemovedImg, this.props.count);
  }

  /**
   * DEPRECATED
   * 
   * encodes a file to base64
   */
  getBase64(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    console.log(file);
    reader.onload = () => {
      // construct an image object
      const imag = {
        'name': file.name,
        'parsedLink': reader.result
      }
      if (this.state.names.includes(file.name)) {
        alert("Image file name already exists. Please rename the image or upload another one.")
      } else {
        this.setState({ names: [...this.state.names, file.name] });
        this.setState({ images: [...this.state.images, imag] });
        this.handleChange("ImageNames", this.state.names, this.props.count);
        this.handleChange("Images", this.state.images, this.props.count);
      }
    };
    reader.onerror = function (error) {
      alert("An error occured. Please refresh the page.");
      console.log('Error: ', error);
    };
  }

  /**
   * DEPRECATED
   * 
   * dropzone implementation for uploading files directly
   */
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
          let base64str = '';
          this.getBase64(file, (result) => {
            base64str = result;
          })
        };
      });
    }));
    // this.setState({
    //   fileNames: acceptedFiles.map(file => file.name)
    // });
  }

  /**
   * Parses the original URL into a URL that's accessible via HTML
   * @param {String} rawURl the URL to an image on google drive
   * 
   * Example: 
   * https://drive.google.com/file/d/1EfTINoAi0YUfR_3rECe_vDT9CtfGTlO-/view?usp=sharing
   * to 
   * https://drive.google.com/uc?export=view&id=1EfTINoAi0YUfR_3rECe_vDT9CtfGTlO-
   */
  async handleImageURL(rawURl) {
    if (rawURl != '') {
      this.state.count += 1;
      const reg = 'file/d/(.*)/view?';
      const match_arr = rawURl.match(reg);
      if (match_arr == null) {
        alert("Please make sure you have copied a valid URL");
      } else {
        // the actual id is the second element in the array because 
        // the first element includes file/d/ and /view?
        const imageID = match_arr[1];
        const parsedURL = "https://drive.google.com/uc?export=view&id=" + imageID
        console.log(parsedURL);
        // this.getBase64Image(parsedURL);
        const imag = {
          'name': this.state.count,
          'parsedLink': parsedURL,
          'originalLink': rawURl
        }
        await this.setState({ images: [...this.state.images, imag] });
        this.handleChange("Images", this.state.images, this.props.count);
        this.imageRef.current.value = '';
      }
    }
  }

  componentDidMount() {
    // NOTE: import includes both "import question from another experiment" and
    //       "Edit experiment"
    if (this.props.imported) {
      // we only want to show the actual content because the question is imported 
      // (researchers may want to use different csv column names)
      this.handleChange("Static Text", this.props.qToDisplay["Static Text"], this.props.count);
      // this.handleChange("ImageNames", this.props.qToDisplay["ImageNames"], this.props.count);
      this.handleChange("Images", this.props.qToDisplay["Images"], this.props.count);
      // this.setState({ names: this.props.qToDisplay["ImageNames"] });
      if (Object.keys(this.props.qToDisplay).includes("Images")) {
        this.setState({ images: this.props.qToDisplay["Images"] });
        var previousCount = 0;
        const arrayLength = this.props.qToDisplay["Images"].length;
        if (arrayLength != 0) {
          const lastElement = this.props.qToDisplay["Images"][arrayLength - 1];
          previousCount = lastElement.name;
        }
        this.setState({ count: previousCount });
      }
    }; 
    if (this.props.editing) {
      // we want to show previous csv column names because researchers want to make edits
      this.handleChange("static-text-key", this.props.qToDisplay["static-text-key"], this.props.count);
    }; 
  }

  render() {
    const qNum = this.props.count + 1;
    // show preview thumbnails
    var Images = ({sth}) => <img src={''} />
    if (this.state.images.length != 0) {
      // console.log(this.state);
      Images = ({sth}) => (
        this.state.images.map(imag => (
          <div style={thumbWithDelete}>
            <div style={thumb} key={imag.name}>
              <div style={thumbInner}>
                <img src={imag.parsedLink} style={{ height: "100%", width: "100%" }}/>
              </div>
            </div>
            <br/>
            <button id={imag.name} onClick={this.onDeleteImage}>
              Delete
            </button>
          </div>
        ))
      );
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
          Add image(s) by pasting shared Google Drive link below:
          {/* <Dropzone
            onDrop={this.handleDrop}
            accept="image/jpeg, image/png"
            >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <p>Drag'n'drop files, or click to select files (must be .jpg or .png)</p>
              </div>
            )}
          </Dropzone> */}
          <br/>
          <textarea cols="60" rows="3" ref={this.imageRef} 
            onInput={() => this.handleImageURL(this.imageRef.current.value)}
            placeholder="Paste a new link here">
          </textarea>
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