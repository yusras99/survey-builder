import React, { Component } from 'react';
import './NormalCurve.css';

class NormalCurve extends Component {
  constructor(props) {
    super(props);

    this.sliderRef = React.createRef();
    this.rectRef = React.createRef();
    this.svgRef = React.createRef();
    this.areaRef = React.createRef();
    this.lengthRef = React.createRef();
    this.startPos1Ref = React.createRef();
    this.startPos2Ref = React.createRef();
    this.graph1keyRef = React.createRef();
    this.graph2keyRef = React.createRef();
    this.qRef = React.createRef();

    this.dotReturn = this.dotReturn.bind(this);
    this.curveArea = this.curveArea.bind(this);
    this.triMouseDown = this.triMouseDown.bind(this);
    this.triDrag = this.triDrag.bind(this);
    this.triUp = this.triUp.bind(this);
    this.curveArea = this.curveArea.bind(this);
    this.lengthSubmit = this.lengthSubmit.bind(this);
    this.toggleXVals = this.toggleXVals.bind(this);
    this.alterStartPos1 = this.alterStartPos1.bind(this);
    this.alterStartPos2 = this.alterStartPos2.bind(this);
    this.onChange = this.onChange.bind(this);

    const unitHeight = this.props.data["max-height"];
    const circRad = this.props.data["circle-radius"];
    const len1 = this.props.data["len1"];
    const len2 = this.props.data["len2"];
    const distancing = circRad * 4 - 1;
    const height = (Math.ceil((distancing * unitHeight) / 50) + 1) * 50;

    const colNumInit = this.props.data["axis-length"];
    const internalLength = colNumInit * distancing;
    const edgeCol = Math.ceil(Math.max(len1, len2) / 2);
    const edgeLength = Math.max(len1, len2) * distancing;

    const ceilDist = height - 50;
    // const length = Math.ceil((distancing * this.props.data["len1"] * 2 + distancing * this.props.data["len2"] * 2) / 100) * 100;
    const length = edgeLength + internalLength;
    const colNum = Math.ceil(length / distancing);
    console.log(height, distancing, ceilDist, colNum);

    const axisStart = Math.ceil(edgeLength / 2);
    const axisStartCol = edgeCol;
    const axisWidth = length - ((len1 / 2 + 1) * distancing + (len2 / 2 + 1) * distancing - 1);
    const axisEndCol = internalLength / distancing;
    const axisEnd = axisEndCol * distancing;

    const triCent1 = Math.ceil((0.5 * len1 + 1) * distancing);
    const triCent2 = Math.ceil((0.5 * len2 + 1) * distancing);
    const triCentCol1 = Math.ceil(triCent1 / distancing);
    const triCentCol2 = Math.ceil(triCent2 / distancing);

    const variance1 = Math.abs(Math.ceil(len1 / 2) - edgeCol);
    const variance2 = Math.abs(Math.ceil(len2 / 2) - edgeCol);

    let startPos1 = this.props.data["startPos1"];
    let col11 = startPos1;
    let col12 = startPos1 + len1 - 1;
    if (startPos1 + triCentCol1 < axisStartCol) {
      startPos1 = variance1 - 1;
      col11 = 0;
      col12 = len1 - 1;
    }
    else if (startPos1 + triCentCol1 > axisStartCol + axisEndCol) {
      startPos1 = variance1 + axisEndCol - 1;
      col11 = axisEndCol;
      col12 = axisEndCol + len1 - 1;
    }

    let startPos2 = this.props.data["startPos2"];
    let col21 = startPos2;
    let col22 = startPos2 + len2 - 1;
    if (startPos2 + triCentCol2 < axisStartCol) {
      startPos2 = variance2 - 1;
      col21 = 0;
      col22 = len2 - 1;
    }
    else if (startPos2 + triCentCol2 > axisStartCol + axisEndCol) {
      startPos2 = variance2 + axisEndCol - 1;
      col21 = axisEndCol;
      col22 = axisEndCol + len2 - 1;
    }

    this.state = {
      axisLength: this.props.data["axis-length"],
      startPos1: this.props.data["startPos1"],
      startPos2: this.props.data["startPos2"],
      x: 0, y: 0, isDown: false,
      rectX: 12.5,
      down: false,
      svgWidth: length,
      svgHeight: height,
      svgX: 6,
      len1: len1,
      colValHeiS: this.props.data["colValHeiS"],
      len2: len2,
      colValHeiS2: this.props.data["colValHeiS2"],
      distancing: distancing,
      distancing1: startPos1 * distancing,
      distancing2: startPos2 * distancing,
      triCent1: triCent1,
      triCentCol1: triCentCol1,
      triCent2: triCent2,
      triCentCol2: triCentCol2,
      mousePointerRange: 0,
      triDown: false,
      col11: col11,
      col12: col12,
      col21: col21,
      col22: col22,
      colLim1: Math.round((length - (len1 * distancing)) / distancing),
      colLim2: Math.round((length - (len2 * distancing)) / distancing),
      overlapVals: this.props.data["overlapVals"],
      circRad: circRad,
      ceilDist: ceilDist,
      axisStart: axisStart,
      axisStartCol: axisStartCol,
      axisWidth: axisWidth,
      axisEnd: axisEnd,
      axisEndCol: axisEndCol,
      edgeCol: edgeCol,
      edgeLength: edgeLength,
      colNum: colNumInit,
      variance1: variance1 - 1,
      variance2: variance2 - 1,
      lowVal: this.props.data["lowVal"],
      showCoors: true
    };
  }

  dotReturn(xPos, yPos) {
    const xPosOrig = xPos;

    const CX = this.state.distancing1 + this.state.distancing * xPosOrig + 10;
    const CY = this.state.ceilDist - this.state.distancing * yPos + 10;

    // const soft = <circle className="icon" stroke="#555" fill="#555" fillOpacity="0.3" strokeOpacity="0.4" cx={CX} cy={CY} r="2"></circle>;
    var hard = <circle className="icon" stroke="DarkCyan" fill="DarkCyan" fillOpacity="0.3" strokeOpacity="0.3" cx={CX} cy={CY} r={this.state.circRad}></circle>;

    return hard;
  }

  dotReturn2(xPos, yPos) {
    const xPosOrig = xPos;

    const CX = this.state.distancing2 + this.state.distancing * xPosOrig + 10;
    const CY = this.state.ceilDist - this.state.distancing * yPos + 10;

    // const soft = <circle className="icon" stroke="#555" fill="#555" fillOpacity="0.3" strokeOpacity="0.4" cx={CX} cy={CY} r="2"></circle>;
    var hard = <circle className="icon" stroke="Crimson" fill="Crimson" fillOpacity="0.3" strokeOpacity="0.3" cx={CX} cy={CY} r={this.state.circRad}></circle>;

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
      var col = Math.round((x - this.state.edgeCol) / this.state.distancing);
      if (col + this.state.triCentCol2 < this.state.axisStartCol) {
        this.setState({ distancing2: this.state.variance2 * this.state.distancing, col21: 0, col22: this.state.len2 - 1 });
      }
      else if (col + this.state.triCentCol2 > this.state.axisStartCol + this.state.axisEndCol) {
        this.setState({ distancing2: this.state.distancing * (this.state.variance2 + this.state.axisEndCol), col21: this.state.axisEndCol, col22: this.state.axisEndCol + this.state.len2 - 1 })
      }
      else {
        this.setState({ distancing2: this.state.distancing * col, col21: col - this.state.variance2, col22: col - this.state.variance2 + this.state.len2 - 1 });
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
      var col = Math.round((x - this.state.edgeCol) / this.state.distancing);
      if (col + this.state.triCentCol1 < this.state.axisStartCol) {
        this.setState({ distancing1: this.state.variance1 * this.state.distancing, col11: 0, col12: this.state.len1 - 1 });
      }
      else if (col + this.state.triCentCol1 > this.state.axisStartCol + this.state.axisEndCol) {
        this.setState({ distancing1: this.state.distancing * (this.state.variance1 + this.state.axisEndCol), col11: this.state.axisEndCol, col12: this.state.axisEndCol + this.state.len1 - 1 })
      }
      else {
        this.setState({ distancing1: this.state.distancing * col, col11: col - this.state.variance1, col12: col - this.state.variance1 + this.state.len1 - 1 });
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
    const col11 = this.state.col11 + this.state.variance1;
    const col12 = this.state.col12 + this.state.variance1;
    const col21 = this.state.col21 + this.state.variance2;
    const col22 = this.state.col22 + this.state.variance2;

    if (col11 > col22 || col12 < col21) {
      this.areaRef.current.innerHTML = 0;
    }
    else {
      // console.log(this.state.col22, this.state.col11, Math.abs(this.state.col22 - this.state.col11));
      this.areaRef.current.innerHTML = this.state.overlapVals[Math.abs(col22 - col11)];
    }
  }
  
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  changeJSON(key, value) {
    this.props.changeJSON(key, value);
  }

  handleChange(key, value, count) {
    this.props.handleChange(key, value, count);
  }

  lengthSubmit(newLength) {
    var newLength = this.lengthRef.current.value;
    const internalLength = newLength * this.state.distancing;
    const length = this.state.edgeLength + internalLength;

    const axisEndCol = internalLength / this.state.distancing;
    const axisEnd = axisEndCol * this.state.distancing;
    console.log(axisEndCol);

    this.changeJSON("axis-length", newLength);

    this.setState({
      colNum: newLength,
      svgWidth: length,
      axisEndCol: axisEndCol,
      axisEnd: axisEnd
    });
  }

  toggleXVals() {
    this.setState(prevState => {
      return {
        showCoors: !prevState.showCoors
      }
    })
  }

  alterStartPos1(newPos) {
    let startPos1 = parseInt(this.startPos1Ref.current.value) + this.state.variance1;
    let col11 = startPos1 - this.state.variance1;
    let col12 = col11 + this.state.len1 - 1;
    if (startPos1 + this.state.triCentCol1 < this.state.axisStartCol) {
      startPos1 = this.state.variance1;
      col11 = 0;
      col12 = this.state.len1 - 1;
    }
    else if (startPos1 + this.state.triCentCol1 > this.state.axisStartCol + this.state.axisEndCol) {
      startPos1 = this.state.variance1 + this.state.axisEndCol;
      col11 = this.state.axisEndCol;
      col12 = this.state.axisEndCol + this.state.len1 - 1;
    }

    this.changeJSON("startPos1", newPos);

    this.setState({
      distancing1: startPos1 * this.state.distancing,
      col11: col11,
      col12: col12
    });
  }

  alterStartPos2(newPos) {
    let startPos2 = parseInt(this.startPos2Ref.current.value) + this.state.variance2;
    let col21 = startPos2 - this.state.variance2;
    let col22 = col21 + this.state.len2 - 1;
    if (startPos2 + this.state.triCentCol2 < this.state.axisStartCol) {
      startPos2 = this.state.variance2;
      col21 = 0;
      col22 = this.state.len2 - 1;
    }
    else if (startPos2 + this.state.triCentCol2 > this.state.axisStartCol + this.state.axisEndCol) {
      startPos2 = this.state.variance2 + this.state.axisEndCol;
      col21 = this.state.axisEndCol;
      col22 = this.state.axisEndCol + this.state.len2 - 1;
    }

    // this.changeStartPos2(newPos);
    this.changeJSON("startPos2", newPos);

    this.setState({
      distancing2: startPos2 * this.state.distancing,
      col21: col21,
      col22: col22
    });
  }

  render() {
    return (
      <div
        onMouseMove={e => this.triDrag(e)}
        onMouseUp={e => this.triUp(e)}>
        <svg width={this.state.svgWidth} height={this.state.svgHeight + 10} ref={this.svgRef}>
          {/* <rect opacity="0.2" width="100%" height="100%" fill="red"/> */}
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
          <rect width={this.state.axisEnd}
            height="2"
            fill="black"
            x={this.state.axisStart - 1}
            y={this.state.ceilDist + 20} />
          <rect width="2"
            height="20"
            fill="black"
            x={this.state.axisStart - 1}
            y={this.state.ceilDist + 20} />
          <rect width="2"
            height="20"
            fill="black"
            x={this.state.axisEnd + this.state.axisStart - 1}
            y={this.state.ceilDist + 20} />
          <polygon
            points={
              [
                [this.state.triCent1 + this.state.distancing1 - 15, this.state.ceilDist + 35],
                [this.state.triCent1 + this.state.distancing1 + 15, this.state.ceilDist + 35],
                [this.state.triCent1 + this.state.distancing1, this.state.ceilDist + 20]
              ]
            }
            onMouseDown={(e, num) => this.triMouseDown(e, 1)}
          />
          <polygon
            points={
              [
                [this.state.triCent2 + this.state.distancing2 - 15, this.state.ceilDist + 35],
                [this.state.triCent2 + this.state.distancing2 + 15, this.state.ceilDist + 35],
                [this.state.triCent2 + this.state.distancing2, this.state.ceilDist + 20]
              ]
            }
            onMouseDown={(e, num) => this.triMouseDown(e, 2)}
          />
          <text text-anchor="middle" x={this.state.axisStart} y={this.state.ceilDist + 55}>{this.state.lowVal}</text>
          <text text-anchor="middle" x={this.state.axisStart + this.state.axisEnd} y={this.state.ceilDist + 55}>{this.state.lowVal + this.state.colNum}</text>
                    Sorry, please use a different browser.
                </svg>
        <br />
        <div class="boxed">
          Question: <br/>
          <textarea cols="60" rows="10" ref={this.qRef} 
            onInput={() => this.handleChange("Question", this.qRef.current.value, this.props.count)}>
          </textarea><br/>
          <div class="color-box" style={{ backgroundColor: "DarkCyan" }}></div>
          <input type="text" 
            ref={this.graph1keyRef}
            onInput={() => this.handleChange("graph1key", this.graph1keyRef.current.value, this.props.count)}></input>
          <br />
          <div class="color-box" style={{ backgroundColor: "Crimson" }}></div>
          <input type="text" 
            ref={this.graph2keyRef}
            onInput={() => this.handleChange("graph2key", this.graph2keyRef.current.value, this.props.count)}></input>
          <br />
          <span>Enter the width of the graph (each point in the curves is 
            equivalent to 1 unit of width) </span>
          <input ref={this.lengthRef} type="text" 
            name="axisLength" value={this.state.axisLength} 
            onChange={this.onChange}/>
          <button onClick={() => {this.lengthSubmit(this.state.axisLength)}}>
            Change Width
          </button>
          <br/>
          <span>Enter your preferred starting position for curve 1, 
            if you want to change it </span>
          <input ref={this.startPos1Ref} 
            type="text" name="startPos1" value={this.state.startPos1} 
            onChange={this.onChange}></input>
          <button onClick={() => this.alterStartPos1(this.state.startPos1)}>
            Change Curve 1
          </button>
          <br/>
          <span>Enter your preferred starting position for curve 2, 
            if you want to change it </span>
          <input ref={this.startPos2Ref} type="text" 
          name="startPos2" value={this.state.startPos2} 
          onChange={this.onChange}></input>
          <button onClick={() => this.alterStartPos2(this.state.startPos2)}>
            Change Curve 2
          </button>
        </div>
        <br />
        <h1>Area Under Curve: <span ref={this.areaRef}></span> | First x-coordinate: {this.state.col11} | Second x-coordinate: {this.state.col21} </h1>
        {/* <h1>{this.props.data["startPos1"]} | {this.props.data["startPos2"]}</h1> */}
      </div>
    )
  }
}

export default NormalCurve;