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
    this.colNumValRef = React.createRef();
    this.radiusRef = React.createRef();
    this.ticksRef = React.createRef();
    this.checkBoxRef = React.createRef();
    this.toggleTriRef1 = React.createRef();
    this.toggleTriRef2 = React.createRef();

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
    this.svgColReturn = this.svgColReturn.bind(this);
    this.svgColReturn = this.svgColReturn.bind(this);
    this.establishStateData = this.establishStateData.bind(this);
    this.updateRadius = this.updateRadius.bind(this);
    this.updateTicks = this.updateTicks.bind(this);
    this.checkChange = this.checkChange.bind(this);
    this.toggleTri1 = this.toggleTri1.bind(this);
    this.toggleTri2 = this.toggleTri2.bind(this);
    this.returnTri1 = this.returnTri1.bind(this);
    this.returnTri2 = this.returnTri2.bind(this);

    this.state = this.establishStateData(this.props.data);
  }

  componentDidMount() {
    this.curveArea();
  }

  establishStateData(data) {
    // console.log("establishStateData()", new Date());
    const unitHeight = data["max-height"];
    const circRad = data["circle-radius"];
    const len1 = data["len1"];
    const len2 = data["len2"];
    const distancing = circRad * 4 - 1;
    const height = (Math.ceil((distancing * unitHeight) / 50) + 1) * 50;

    const colNumInit = data["axis-length"];
    const internalLength = colNumInit * distancing;
    const edgeCol = Math.ceil(Math.max(len1, len2) / 2);
    const edgeLength = Math.max(len1, len2) * distancing;

    const ceilDist = height - 50;
    const length = edgeLength + internalLength;
    const colNum = Math.ceil(length / distancing);

    const axisStart = Math.ceil(edgeLength / 2);
    const axisStartCol = edgeCol;
    const axisWidth = length - ((len1 / 2 + 1) * distancing + (len2 / 2 + 1) * distancing - 1);
    const axisEndCol = internalLength / distancing;
    const axisEnd = axisEndCol * distancing;

    const triCent1 = Math.ceil(0.5 * len1) * distancing;
    const triCent2 = Math.ceil(0.5 * len2) * distancing;
    const triCentCol1 = Math.ceil(triCent1 / distancing);
    const triCentCol2 = Math.ceil(triCent2 / distancing);

    const variance1 = Math.abs(Math.ceil(len1 / 2) - axisStartCol);
    const variance2 = Math.abs(Math.ceil(len2 / 2) - axisStartCol);

    const startPos1 = data["startPos1"];
    let distancing1 = startPos1 + variance1 - 1;
    let col11 = startPos1 + variance1;
    let col12 = startPos1 + len1 - 1;
    let col11Rel = startPos1 + 1;

    let variance = axisStartCol - variance1;
    if (col11 < axisStartCol - 1) {
      distancing1 = (axisStartCol - 1) * distancing;
      col11 = 0;
      col12 = len1 - 1;
    }
    else if (col11 + len1 + 1 > axisStartCol + axisEndCol) {
      const endCol = axisEndCol - len1;
      distancing1 = distancing * (axisStartCol + endCol - 1);
      col11 = endCol;
      col12 = endCol + len2 - 1;
    }
    else {
      distancing1 = distancing * col11;
      col11 = col11Rel - variance;
      col12 = col11Rel - variance + len1 - 1;
    }

    const startPos2 = data["startPos2"];
    let distancing2 = startPos2 + variance2 - 1;
    let col21 = startPos2 + variance2;
    let col22 = startPos2 + len2 - 1;
    let col21Rel = startPos2 + 1;

    variance = axisStartCol - variance2;
    if (col21 < axisStartCol - 1) {
      distancing2 = (axisStartCol - 1) * distancing;
      col21 = 0;
      col22 = len2 - 1;
    }
    else if (col21 + len2 + 1 > axisStartCol + axisEndCol) {
      const endCol = axisEndCol - len2;
      distancing2 = distancing * (axisStartCol + endCol - 1);
      col21 = endCol;
      col22 = endCol + len2 - 1;
    }
    else {
      distancing2 = distancing * col21;
      col21 = col21Rel - variance;
      col22 = col21Rel - variance + len2 - 1;
    }

    let colNumVal;
    if ("colNumVal" in data) {
      colNumVal = this.props.data["colNumVal"];
    }
    else {
      colNumVal = 1;
    }

    let tickNum;
    let tickDist;
    let rangeVal;
    const axisLength = colNumInit * colNumVal;
    if ("tickNum" in data && axisLength % (parseInt(data["tickNum"]) + 1) === 0) {
      tickNum = parseInt(data["tickNum"]);
      tickDist = colNumInit * distancing / (tickNum + 1);
      rangeVal = axisLength / (tickNum + 1);
    }
    else {
      tickNum = 0;
      tickDist = axisLength;
      rangeVal = axisLength;
    }

    let edgeLim;
    if ("edgeLim" in data) {
      edgeLim = data["edgeLim"];
    }
    else {
      edgeLim = true;
    }

    let fixCurve1;
    if ("fixCurve1" in data) {
      fixCurve1 = data["fixCurve1"];
    }
    else {
      fixCurve1 = false;
    }

    let fixCurve2;
    if ("fixCurve2" in data) {
      fixCurve2 = data["fixCurve2"];
    }
    else {
      fixCurve2 = false;
    }

    return {
      axisLength: data["axis-length"],
      startPos1: data["startPos1"],
      startPos2: data["startPos2"],
      x: 0, y: 0, isDown: false,
      rectX: 12.5,
      down: false,
      svgWidth: length,
      svgHeight: height,
      svgX: 6,
      len1: len1,
      colValHeiS: data["colValHeiS"],
      len2: len2,
      colValHeiS2: data["colValHeiS2"],
      distancing: distancing,
      distancing1 : distancing1,
      distancing2: distancing2,
      triCent1: triCentCol1 * distancing,
      triCentCol1: triCentCol1,
      triCent2: triCentCol2 * distancing,
      triCentCol2: triCentCol2,
      mousePointerRange: 0,
      triDown: false,
      col11: col11,
      col12: col12,
      col21: col21,
      col22: col22,
      colLim1: Math.round((length - (len1 * distancing)) / distancing),
      colLim2: Math.round((length - (len2 * distancing)) / distancing),
      overlapVals: data["overlapVals"],
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
      variance1: variance1,
      variance2: variance2,
      lowVal: this.props.data["lowVal"],
      showCoors: true,
      colNumVal: colNumVal,
      tickNum: tickNum,
      tickDist: tickDist,
      rangeVal: rangeVal,
      edgeLim: edgeLim,
      fixCurve1: fixCurve1,
      fixCurve2: fixCurve2
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

  returnTri1() {
    if (this.state.fixCurve1) {
      return (null);
    }
    else {
      return (
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
      )
    }
  }

  returnTri2() {
    if (this.state.fixCurve2) {
      return (null);
    }
    else {
      return (
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
      )
    }
  }

  svgColReturn(e, dragger) {
    let distFromCent;
    let variance;
    if (dragger === 1) {
      distFromCent = this.state.triCentCol1;
      variance = this.state.variance1;
    }
    else if (dragger === 2) {
      distFromCent = this.state.triCentCol2;
      variance = this.state.variance2;
    }
    var svg = this.svgRef.current;
    var pt = svg.createSVGPoint();
    pt.x = e.clientX;
    var svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
    e.preventDefault();
    var x = svgP.x - distFromCent + this.state.mousePointerRange;
    var col = Math.round((x - this.state.axisStart) / this.state.distancing) + variance;
    var colRelative = Math.round((x - this.state.axisStart) / this.state.distancing) + 1;
    // console.log(col, colRelative, variance);
    return [col, colRelative];
  }

  svgColPlacement(col, colRelative, dragger) {
    // console.log(col);
    // console.log(this.state.axisStartCol);
    // console.log(this.state.axisStart);
    if (this.state.edgeLim) {
      if (dragger === 2) {
        const variance = this.state.axisStartCol - this.state.variance2;
        if (col < this.state.axisStartCol - 1) {
          // console.log("edge");
          this.setState({ distancing2: (this.state.axisStartCol - 1) * this.state.distancing, col21: 0, col22: this.state.len2 - 1 });
        }
        else if (col + this.state.len2 + 1 > this.state.axisStartCol + this.state.axisEndCol) {
          const endCol = this.state.axisEndCol - this.state.len2;
          this.setState({ distancing2: this.state.distancing * (this.state.axisStartCol + endCol - 1), col21: endCol, col22: endCol + this.state.len2 - 1 })
        }
        else {
          this.setState({ distancing2: this.state.distancing * col, col21: colRelative - variance, col22: colRelative - variance + this.state.len2 - 1 });
        }
        this.curveArea();
      }
      else if (dragger === 1) {
        const variance = this.state.axisStartCol - this.state.variance1;
        if (col < this.state.axisStartCol - 1) {
          this.setState({ distancing1: (this.state.axisStartCol - 1) * this.state.distancing, col11: 0, col12: this.state.len1 - 1 });
        }
        else if (col + this.state.len1 + 1 > this.state.axisStartCol + this.state.axisEndCol) {
          const endCol = this.state.axisEndCol - this.state.len1;
          this.setState({ distancing1: this.state.distancing * (this.state.axisStartCol + endCol - 1), col11: endCol, col12: endCol + this.state.len1 - 1 })
        }
        else {
          this.setState({ distancing1: this.state.distancing * col, col11: colRelative - variance, col12: colRelative - variance + this.state.len1 - 1 });
        }
        // this.setState({ distancing2 : x })
      }
    }
    else {
      col = col - 1;
      if (dragger === 2) {
        // colRelative = colRelative - this.state.axisStartCol + this.state.variance2;
        if (col + this.state.triCentCol2 < this.state.axisStartCol) {
          this.setState({ distancing2: (this.state.variance2) * this.state.distancing, col21: 0, col22: this.state.len2 - 1 });
        }
        else if (col + this.state.triCentCol2 + 1 > this.state.axisStartCol + this.state.axisEndCol) {
          this.setState({ distancing2: this.state.distancing * (this.state.variance2 + this.state.axisEndCol - 1), col21: this.state.axisEndCol, col22: this.state.axisEndCol + this.state.len2 - 1 })
        }
        else {
          this.setState({ distancing2: this.state.distancing * col, col21: colRelative, col22: colRelative + this.state.len2 - 1 });
        }
        this.curveArea();
      }
      else if (dragger === 1) {
        // colRelative = colRelative - this.state.axisStartCol + this.state.variance1;
        if (col + this.state.triCentCol1 < this.state.axisStartCol) {
          this.setState({ distancing1: (this.state.variance1) * this.state.distancing, col11: 0, col12: this.state.len1 - 1 });
        }
        else if (col + this.state.triCentCol1 + 1 > this.state.axisStartCol + this.state.axisEndCol) {
          this.setState({ distancing1: this.state.distancing * (this.state.variance1 + this.state.axisEndCol - 1), col11: this.state.axisEndCol, col12: this.state.axisEndCol + this.state.len1 - 1 })
        }
        else {
          this.setState({ distancing1: this.state.distancing * col, col11: colRelative, col12: colRelative + this.state.len1 - 1 });
        }
        this.curveArea();
      }
    }
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
      e.preventDefault();
      var dragger = this.state.triDown;
      var cols = this.svgColReturn(e, dragger);
      var col = cols[0];
      var colRelative = cols[1]
      // console.log(col);
      this.setState(this.svgColPlacement(col, colRelative, dragger));
      this.curveArea();
  }

  triUp(e) {
    // console.log("UP");
    if (this.state.triDown) {
      this.setState({ triDown: false });
    }
  }

  curveArea() {
    let col11;
    let col12;
    let col21;
    let col22;

    if (this.state.edgeLim) {
      col11 = this.state.col11;
      col12 = this.state.col12;
      col21 = this.state.col21;
      col22 = this.state.col22;
    }
    else {
      col11 = this.state.col11 + this.state.variance1;
      col12 = this.state.col12 + this.state.variance1;
      col21 = this.state.col21 + this.state.variance2;
      col22 = this.state.col22 + this.state.variance2;
    }

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

  lengthSubmit() {
    const newLength = this.lengthRef.current.value;
    const internalLength = newLength * this.state.distancing;
    const length = this.state.edgeLength + internalLength;

    const axisEndCol = internalLength / this.state.distancing;
    const axisEnd = axisEndCol * this.state.distancing;
    // console.log(axisEndCol);

    this.changeJSON("axis-length", newLength);

    this.setState({
      colNum: newLength,
      svgWidth: length,
      axisEndCol: axisEndCol,
      axisEnd: axisEnd
    });

    const col1 = this.state.col11 - 1 + this.state.variance1;
    this.svgColPlacement(col1, this.state.col11, 1);

    const col2 = this.state.col21 - 1 + this.state.variance2;
    this.svgColPlacement(col2, this.state.col21, 2);
  }

  toggleXVals() {
    this.setState(prevState => {
      return {
        showCoors: !prevState.showCoors
      }
    })
  }

  alterStartPos1(newPos) {
    let startPos1 = parseInt(this.startPos1Ref.current.value) + this.state.variance1 - 1;
    let col11 = startPos1 - this.state.variance1 + 1;
    let col12 = col11 + this.state.len1 - 1;
    if (startPos1 + this.state.triCentCol1 < this.state.axisStartCol) {
      startPos1 = this.state.variance1 - 1;
      col11 = 0;
      col12 = this.state.len1 - 1;
    }
    else if (startPos1 + this.state.triCentCol1 > this.state.axisStartCol + this.state.axisEndCol) {
      startPos1 = this.state.variance1 + this.state.axisEndCol - 1;
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
    let startPos2 = parseInt(this.startPos2Ref.current.value) + this.state.variance2 - 1;
    let col21 = startPos2 - this.state.variance2 + 1;
    let col22 = col21 + this.state.len2 - 1;
    if (startPos2 + this.state.triCentCol2 < this.state.axisStartCol) {
      startPos2 = this.state.variance2 - 1;
      col21 = 0;
      col22 = this.state.len2 - 1;
    }
    else if (startPos2 + this.state.triCentCol2 > this.state.axisStartCol + this.state.axisEndCol) {
      startPos2 = this.state.variance2 + this.state.axisEndCol - 1;
      col21 = this.state.axisEndCol;
      col22 = this.state.axisEndCol + this.state.len2 - 1;
    }

    this.changeJSON("startPos2", newPos);

    this.setState({
      distancing2: startPos2 * this.state.distancing,
      col21: col21,
      col22: col22
    });
  }
  
  updateRadius(radius) {
    // console.log("updateRadius", radius);
    this.changeJSON("circle-radius", radius);
    let newData = this.props.data;
    newData["circle-radius"] = radius;
    this.setState(this.establishStateData(newData));
  }

  updateTicks(newTickCount) {
    this.changeJSON("tickNum", newTickCount);
    let newData = this.props.data;
    newData["tickNum"] = newTickCount;
    this.setState(this.establishStateData(newData));
  }

  updateColVal(colVal) {
    this.changeJSON("colNumVal", colVal);
    this.setState({ colNumVal : colVal });
  }

  checkChange() {
    this.setState(prevState => {
      this.changeJSON("edgeLim", !prevState.edgeLim);
      return {
        edgeLim: !prevState.edgeLim
      }
    })
    console.log(this.state.edgeLim);
  }

  toggleTri1() {
    if (!this.state.fixCurve1) {
      this.setState({startPos1 : this.state.distancing1})
    }
    this.setState(prevState => {
      this.changeJSON("fixCurve1", !prevState.fixCurve1);
      return {
        fixCurve1 : !prevState.fixCurve1
      }});
  }

  toggleTri2() {
    if (!this.state.fixCurve2) {
      this.setState({startPos2 : this.state.distancing2})
    }
    this.setState(prevState => {
      this.changeJSON("fixCurve2", !prevState.fixCurve2);
      return {
        fixCurve2 : !prevState.fixCurve2
      }});
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
          <rect width={this.state.axisEnd - this.state.distancing}
            height="2"
            fill="black"
            x={this.state.axisStartCol * this.state.distancing - 1}
            y={this.state.ceilDist + 20} />
          <rect width="2"
            height="20"
            fill="black"
            x={this.state.axisStartCol * this.state.distancing - 1}
            y={this.state.ceilDist + 20} />
          <rect width="2"
            height="20"
            fill="black"
            x={this.state.axisEnd - this.state.distancing + this.state.axisStartCol * this.state.distancing - 1}
            y={this.state.ceilDist + 20} />
          {[...Array(this.state.tickNum).keys()].map(
            (tick) =>
              <rect
                width="2"
                height="20"
                fill="black"
                x={this.state.axisStart + (this.state.tickDist * (tick + 1)) - 1} 
                y={this.state.ceilDist + 20}
              />
          )}
          {[...Array(this.state.tickNum).keys()].map(
            (tick) =>
            <text 
            textAnchor="middle" 
            x={this.state.axisStart + (this.state.tickDist * (tick + 1)) - 1} 
            y={this.state.ceilDist + 55}>
              {this.state.lowVal + (this.state.rangeVal * (tick + 1))}
            </text>
          )}
          {/* triangle rendering below */}
          {this.returnTri1()}
          {this.returnTri2()}
          <text textAnchor="middle" x={this.state.axisStart} y={this.state.ceilDist + 55}>{this.state.lowVal}</text>
          <text textAnchor="middle" x={this.state.axisStart + this.state.axisEnd} y={this.state.ceilDist + 55}>{this.state.lowVal + this.state.colNum * this.state.colNumVal}</text>
                    Sorry, please use a different browser.
                </svg>
        <br />
        <div class="boxed">
          Question: <br/>
          <textarea cols="60" rows="10" ref={this.qRef} 
            onInput={() => this.handleChange("Question", this.qRef.current.value, this.props.count)}>
          </textarea><br/>

          <div className="color-box" style={{ backgroundColor: "DarkCyan" }}></div>
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
          <button onClick={() => {this.lengthSubmit()}}>
            Change Width
          </button>
          <br/>

          <span>Enter your preferred value for the width of each unit in the curve</span>
          <input type="text" ref={this.colNumValRef}></input>
          <button onClick={() => this.updateColVal(this.colNumValRef.current.value)}>Change Unit Value</button>
          <br />
          
          <span>Enter your preferred value for the radius of each unit in the curve (2 - 5, inclusive)</span>
          <input type="text" ref={this.radiusRef}></input>
          <button onClick={() => this.updateRadius(this.radiusRef.current.value)}>Change Radius</button>
          <br />

          <span>Enter your preferred number of ticks on the graph (must be divisible by the range of the x-axis)</span>
          <input type="text" ref={this.ticksRef}></input>
          <button onClick={() => this.updateTicks(this.ticksRef.current.value)}>Change Tick Count</button>
          <br />

          <span>Enter your preferred starting position for curve 1, 
            if you want to change it </span>
          <input ref={this.startPos1Ref} 
            type="text" name="startPos1" value={this.state.startPos1} 
            onChange={this.onChange}></input>
          <button onClick={() => this.alterStartPos1(this.state.startPos1)}>
            Change Curve 1
          </button>
          <br/>

          <input 
          type="checkbox"
          ref={this.toggleTriRef1}
          onChange={this.toggleTri1} />
          <label for="toggle1"> Check to lock the position of the curve</label>
          <br/>

          <span>Enter your preferred starting position for curve 2, 
            if you want to change it </span>
          <input ref={this.startPos2Ref} type="text" 
          name="startPos2" value={this.state.startPos2} 
          onChange={this.onChange}></input>
          <button onClick={() => this.alterStartPos2(this.state.startPos2)}>
            Change Curve 2
          </button>
          <br />

          <input 
          type="checkbox"
          ref={this.toggleTriRef2}
          onChange={this.toggleTri2} />
          <label for="toggle2"> Check to lock the position of the curve</label>
          <br/>

          <input 
          type="checkbox"
          ref={this.checkBoxRef}
          onChange={this.checkChange} />
          <label for="vehicle1"> Turn edge limiting on/off</label>
        </div>
        <br />
        <h4>Area Under Curve: <span ref={this.areaRef}></span> | First x-coordinate: {this.state.col11} | Second x-coordinate: {this.state.col21} </h4>
        
        {/* <h1>{this.props.data["startPos1"]} | {this.props.data["startPos2"]}</h1> */}
      </div>
    )
  }
}

export default NormalCurve;