import React, { Component } from 'react';
import Dropzone, { useDropzone } from "react-dropzone";
import './NormalCurve.css';

// NEW:
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { 
  getColData
} from '../../../actions/dataActions'

class NormalCurveResearch extends Component {
  constructor(props) {
    super(props);

    this.svgRef = React.createRef();
    this.areaRef = React.createRef();

    this.qRef = React.createRef();
    this.data1Ref = React.createRef();
    this.data2Ref = React.createRef();

    this.dotReturn = this.dotReturn.bind(this);
    this.curveArea = this.curveArea.bind(this);
    this.triMouseDown = this.triMouseDown.bind(this);
    this.triDrag = this.triDrag.bind(this);
    this.triUp = this.triUp.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSelectedFile = this.handleSelectedFile.bind(this);

    this.state = {
      x: 0, y: 0, isDown: false,
      rectX: 12.5,
      down: false,
      svgWidth: 500,
      svgHeight: 250,
      svgX: 6,
      distancing: 7,
      mousePointerRange: 0,
      triDown: false,
      dataReceived: false,
      fileNames: [],
      setFileNames: [],
      fileChosen: ''
    };
  }

  componentDidMount() {
    const username = this.props.auth.user.username;
    this.props.getColData(username, "itemData");
  }

  dotReturn(xPos, yPos) {
    const xPosOrig = xPos;
    if (xPos > 7) {
      xPos = 15 - xPos;
    }
    const CX = this.state.distancing1 + this.state.distancing * xPosOrig + 10;
    const CY = 140 - this.state.distancing * yPos + 10;
    var hard;
    if (CX < this.state.rectX) {
      hard = <circle className="icon" stroke="DarkCyan" fill="DarkCyan" fillOpacity="0.3" strokeOpacity="0.3" cx={CX} cy={CY} r="2"></circle>;
    }
    else {
      hard = <circle className="icon" stroke="DarkCyan" fill="DarkCyan" fillOpacity="0.3" strokeOpacity="0.3" cx={CX} cy={CY} r="2"></circle>;
    }
    return hard;
  }

  dotReturn2(xPos, yPos) {
    const xPosOrig = xPos;
    if (xPos > 7) {
      xPos = 15 - xPos;
    }
    const CX = this.state.distancing2 + this.state.distancing * xPosOrig + 10;
    const CY = 140 - this.state.distancing * yPos + 10;
    var hard;
    if (CX < this.state.rectX) {
      hard = <circle className="icon" stroke="Crimson" fill="Crimson" fillOpacity="0.3" strokeOpacity="0.3" cx={CX} cy={CY} r="2"></circle>;
    }
    else {
      hard = <circle className="icon" stroke="Crimson" fill="Crimson" fillOpacity="0.3" strokeOpacity="0.3" cx={CX} cy={CY} r="2"></circle>;
    }
    return hard;
  }

  triMouseDown(e, num) {
    if (e.type === "mousedown") {
      // console.log("MOUSEDOWN");
      e.preventDefault();
      var svgPre = this.svgRef.current;
      // Set mousePointerRange so that we know the distance
      // from the mouse tip to the x-value of the triangle
      // tip
      var ptPre = svgPre.createSVGPoint();
      ptPre.x = e.clientX;
      var svgPPre = ptPre.matrixTransform(svgPre.getScreenCTM().inverse());
      if (num === 1) {
        this.setState(prevState => ({
          // rectX : svgP.x,
          triDown: num,
          mousePointerRange: prevState.triCent1 + this.state.distancing1 - svgPPre.x
        }));
      }
      else if (num === 2) {
        this.setState(prevState => ({
          // rectX : svgP.x,
          triDown: num,
          mousePointerRange: prevState.triCent2 + this.state.distancing2 - svgPPre.x
        }));
      }
      // console.log(this.state);
    }
  }

  triDrag(e) {
    // Set mousePointerRange so that we know the distance
    // from the mouse tip to the x-value of the triangle
    // tip
    var svgPre = this.svgRef.current;
    var ptPre = svgPre.createSVGPoint();
    ptPre.x = e.clientX;
    var svgPPree = ptPre.matrixTransform(svgPre.getScreenCTM().inverse());
    this.setState({ x: e.screenX, y: e.screenY, svgX: svgPPree.x });
    if (this.state.triDown === 2) {
      // console.log("DRAG CONT'D");
      var svg = this.svgRef.current;
      var pt = svg.createSVGPoint();
      pt.x = e.clientX;
      var svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
      e.preventDefault();
      var x = svgP.x - this.state.triCent2 + this.state.mousePointerRange;
      var col = Math.round((x - 6) / 7);
      if (col < 0) {
        this.setState({ distancing2: 0, col21: 0, col22: this.state.len2 - 1 });
      }
      else if (col > this.state.colLim2) {
        this.setState({ distancing2: this.state.distancing * this.state.colLim2, col21: this.state.colLim2, col22: this.state.colLim2 + this.state.len2 - 1 })
      }
      else {
        this.setState({ distancing2: this.state.distancing * col, col21: col, col22: col + this.state.len2 - 1 });
      }
      this.curveArea(col);
      // this.setState({ distancing2 : x })
    }
    else if (this.state.triDown === 1) {
      // console.log("DRAG CONT'D");
      var svg = this.svgRef.current;
      var pt = svg.createSVGPoint();
      pt.x = e.clientX;
      var svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
      e.preventDefault();
      var x = svgP.x - this.state.triCent1 + this.state.mousePointerRange;
      var col = Math.round((x - 6) / 7);
      if (col < 0) {
        this.setState({ distancing1: 0, col11: 0, col12: this.state.len1 - 1 });
      }
      else if (col > this.state.colLim1) {
        this.setState({ distancing1: this.state.distancing * this.state.colLim1, col11: this.state.colLim1, col2: this.state.colLim1 + this.state.len1 - 1 })
      }
      else {
        this.setState({ distancing1: this.state.distancing * col, col11: col, col12: col + this.state.len1 - 1 });
      }
      this.curveArea(col);
      // this.setState({ distancing2 : x })
    }
  }

  triUp(e) {
    // console.log("UP");
    if (this.state.triDown) {
      this.setState({ triDown: false });
    }
  }

  curveArea(col) {
    if (this.state.col11 >= this.state.col22 || this.state.col12 <= this.state.col21) {
      this.areaRef.current.innerHTML = 0;
    }
    else {
      this.areaRef.current.innerHTML = this.state.overlapVals[Math.abs(this.state.col22 - this.state.col11)];
    }
  }

  saveFile(type, name, content) {
    this.props.saveFile(type, name, content);
  }

  handleDrop(acceptedFiles) {
    if (acceptedFiles) {
      console.log(acceptedFiles.map(file => {
        acceptedFiles.forEach((file) => {

          this.handleChange("FileName", file.name, this.props.count);

          const reader = new FileReader();
          reader.onabort = () => console.log('file reading was aborted')
          reader.onerror = () => console.log('file reading has failed')
          reader.onload = () => {
            // Do whatever you want with the file contents
            const fileText = reader.result;
            // console.log(fileText);
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
            this.setState({
              dataReceived: true,
              len1: jsonData["len1"],
              colValHeiS: jsonData["colValHeiS"],
              len2: jsonData["len2"],
              colValHeiS2: jsonData["colValHeiS2"],
              distancing1: (jsonData["len2"] + 1) * 7,
              distancing2: (jsonData["len1"] + jsonData["len2"] + 4) * 7,
              triCent1: Math.round((0.5 * jsonData["len1"]) * 7) + 7,
              triCent2: Math.round((0.5 * jsonData["len2"]) * 7) + 7,
              col11: jsonData["len2"] + 1,
              col12: jsonData["len1"] + jsonData["len2"] + 1,
              col21: jsonData["len1"] + jsonData["len2"] + 3,
              col22: jsonData["len1"] + 2 * jsonData["len2"] + 3,
              colLim1: Math.round((500 - (jsonData["len1"] * 7)) / 7),
              colLim2: Math.round((500 - (jsonData["len2"] * 7)) / 7),
              overlapVals: jsonData["overlapVals"]
            })
          }
          reader.readAsText(file)
        })
      }));
    }
    this.setState({ fileNames: acceptedFiles.map(file => file.name) })
  }

  handleSelectedFile() {
    this.handleChange("FileName", this.state.fileChosen, this.props.count);

    const jsonData = this.props.dataFlowColData.filter(item => 
      item.fileName == this.state.fileChosen)[0].fileContent;

    this.handleChange("FileContent", jsonData, this.props.count);

    this.setState({
      dataReceived: true,
      len1: jsonData["len1"],
      colValHeiS: jsonData["colValHeiS"],
      len2: jsonData["len2"],
      colValHeiS2: jsonData["colValHeiS2"],
      distancing1: (jsonData["len2"] + 1) * 7,
      distancing2: (jsonData["len1"] + jsonData["len2"] + 4) * 7,
      triCent1: Math.round((0.5 * jsonData["len1"]) * 7) + 7,
      triCent2: Math.round((0.5 * jsonData["len2"]) * 7) + 7,
      col11: jsonData["len2"] + 1,
      col12: jsonData["len1"] + jsonData["len2"] + 1,
      col21: jsonData["len1"] + jsonData["len2"] + 3,
      col22: jsonData["len1"] + 2 * jsonData["len2"] + 3,
      colLim1: Math.round((500 - (jsonData["len1"] * 7)) / 7),
      colLim2: Math.round((500 - (jsonData["len2"] * 7)) / 7),
      overlapVals: jsonData["overlapVals"]
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

  handleChange(type, q, count) {
    this.props.handleChange(type, q, count);
  }

  render() {
    if (this.state.dataReceived) {
      return (
        <form
          onMouseMove={e => this.triDrag(e)}
          onMouseUp={e => this.triUp(e)}>
          <svg width={this.state.svgWidth} height={this.state.svgHeight} ref={this.svgRef}>
            {/* <rect width="100%" height="100%" fill="red"/> */}
            {[...Array(this.state.len1).keys()].map(
              (col) =>
                [...Array(this.state.colValHeiS[col]).keys()].map(
                  (row) => this.dotReturn(col, row)
                )
            )}
            {[...Array(this.state.len2).keys()].map(
              (col) =>
                [...Array(this.state.colValHeiS2[col]).keys()].map(
                  (row) => this.dotReturn2(col, row)
                )
            )}
            <polygon
              points={
                [
                  [this.state.triCent1 + this.state.distancing1 - 15, 175],
                  [this.state.triCent1 + this.state.distancing1 + 15, 175],
                  [this.state.triCent1 + this.state.distancing1, 160]
                ]
              }
              onMouseDown={(e, num) => this.triMouseDown(e, 1)}
            />
            <polygon
              points={
                [
                  [this.state.triCent2 + this.state.distancing2 - 15, 175],
                  [this.state.triCent2 + this.state.distancing2 + 15, 175],
                  [this.state.triCent2 + this.state.distancing2, 160]
                ]
              }
              onMouseDown={(e, num) => this.triMouseDown(e, 2)}
            />
            Sorry, please use a different browser.
          </svg><br/>
          <p>
            Question: <p></p>
            <input type="text" ref={this.qRef} 
              onInput={() => this.handleChange("Question", this.qRef.current.value, this.props.count)}/>
          </p><br/><br/>
          {/* Modified below */}
          <div className="boxed">
            <div className="color-box" style={{ backgroundColor: "DarkCyan" }}></div>
            <input type="text" id="Data1" name="Data1" ref={this.data1Ref}
              onInput={() => this.handleChange("Data1", this.data1Ref.current.value, this.props.count)} />
            <br />
            <div className="color-box" style={{ backgroundColor: "Crimson" }}></div>
            <input type="text" id="Data2" name="Data2" ref={this.data2Ref}
              onInput={() => this.handleChange("Data2", this.data2Ref.current.value, this.props.count)}/>
          </div><br/>
          <h4>Area Under Curve: <span ref={this.areaRef}></span></h4>
          <button onClick={this.delete.bind(this)}>Delete this Question</button>
          <br/><br/>
        </form>
      )
    }
    else {
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