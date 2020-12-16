import React, { Component } from 'react';
import './ThresholdCurve.css';
import './HistSlider.css';
import Dropzone, { useDropzone } from "react-dropzone";

import { json } from 'd3';

class ThresholdCurve extends Component {
    constructor(props) {
      super(props);
  
      this.sliderRef = React.createRef();
      this.slider2Ref = React.createRef();
      this.rectRef = React.createRef();
      this.svgRef = React.createRef();
      this.areaRef = React.createRef();
      this.lengthRef = React.createRef();
      this.graph1keyRef = React.createRef();
      this.graph2keyRef = React.createRef();
      this.qRef = React.createRef();
      this.colNumValRef = React.createRef();
      this.radRef = React.createRef();
      this.ticksRef = React.createRef();
      this.checkBoxRef = React.createRef();
      this.toggleTriRef1 = React.createRef();
      this.toggleTriRef2 = React.createRef();
      this.questionKeyRef = React.createRef();
      this.legendKey1Ref = React.createRef();
      this.legendKey2Ref = React.createRef();
      this.stroke1Ref = React.createRef();
      this.stroke2Ref = React.createRef();
      this.stroke3Ref = React.createRef();
      this.stroke4Ref = React.createRef();
      this.fill1Ref = React.createRef();
      this.fill2Ref = React.createRef();
      this.fill3Ref = React.createRef();
      this.fill4Ref = React.createRef();
      this.distancing = React.createRef();
      this.distancing2 = React.createRef();
      this.distancing3 = React.createRef();
      this.colWidth = React.createRef();
      this.displayVal1 = React.createRef();
      this.displayVal2 = React.createRef();
      this.rect1Width = React.createRef();
      this.rectHeight = React.createRef();
      this.rect2Width = React.createRef();

      //this.dotReturn = this.dotReturn.bind(this); 
      this.onChange1 = this.onChange1.bind(this);
      this.onChange2 = this.onChange2.bind(this);

      //this.svgColReturn = this.svgColReturn.bind(this);
      //this.svgColReturn = this.svgColReturn.bind(this);
      this.dotReturn1 = this.dotReturn1.bind(this);
      this.dotReturn2= this.dotReturn2.bind(this);
      this.dotReturn3= this.dotReturn3.bind(this);
      this.dotReturn4= this.dotReturn4.bind(this);
      this.rectReturn1 = this.rectReturn1.bind(this);
      this.rectReturn2 = this.rectReturn2.bind(this);
      this.rectReturn3 = this.rectReturn3.bind(this);
      this.rectReturn4 = this.rectReturn4.bind(this);
      this.rectReturn5 = this.rectReturn5.bind(this);
      this.rectReturn6 = this.rectReturn6.bind(this);
      this.rectReturn7 = this.rectReturn7.bind(this);
      this.rectReturn8 = this.rectReturn8.bind(this);
      this.textReturn = this.textReturn.bind(this);


      this.establishStateData = this.establishStateData.bind(this);
      //this.updateRadius = this.updateRadius.bind(this);
      //this.changeColor1 = this.changeColor1.bind(this);
      //this.changeColor2 = this.changeColor2.bind(this);
      //this.changeJSON = this.changeJSON.bind(this);
      //this.onUpdateShapes = this.onUpdateShapes.bind(this);
      //this.onFinishShapes = this.onFinishShapes.bind(this);   
      this.state = this.establishStateData(this.props.data);
    }
    onChange1(e) {
      this.setState({ [e.target.name]: e.target.value })
      this.setState({rect1Width : 400*this.state.displayArr1[e.target.value-1]})
      this.setState({rect2Width: 400*this.state.displayArr2[e.target.value-1]})
    }
    onChange2(e) {
      this.setState({rect3Width : 400*this.state.displayArr3[e.target.value-1]})
      this.setState({rect4Width: 400*this.state.displayArr4[e.target.value-1]})
      this.setState({ [e.target.name]: e.target.value })
    }

    changeStroke1() {
      const newColor = this.stroke1Ref.current.value;
      if (newColor === "#FF0000"){
        this.setState({stroke3: "#0000FF"});
        this.setState({stroke4: "#0000FF"});
        this.setState({fill4:"#0000FF"});
        this.setState({ stroke1 : newColor });
        this.setState({stroke2: newColor});
        this.setState({fill2:newColor});
      }
      if (newColor === "#0000FF"){
        this.setState({stroke3: "#FF0000"});
        this.setState({stroke4: "#FF0000"});        
        this.setState({fill4: "#FF0000"});
        this.setState({ stroke1 : newColor });
        this.setState({stroke2: newColor});
        this.setState({fill2:newColor});
      }
      if(newColor === "Orange and Blue"){
        this.setState({stroke3: "#0000FF"});
        this.setState({stroke4: "#0000FF"});
        this.setState({fill4:"#0000FF"});
        this.setState({stroke1: "#ffa500"});
        this.setState({stroke2: "#ffa500"});
        this.setState({fill2: "#ffa500"});
      }
      if(newColor === "Blue and Orange"){
        this.setState({stroke1: "#0000FF"});
        this.setState({stroke2: "#0000FF"});
        this.setState({fill2:"#0000FF"});
        this.setState({stroke3: "#ffa500"});
        this.setState({stroke4: "#ffa500"});
        this.setState({fill4: "#ffa500"});
      }
      if(newColor === "Blue and Yellow"){
        this.setState({stroke1: "#0000FF"});
        this.setState({stroke2: "#0000FF"});
        this.setState({fill2:"#0000FF"});
        this.setState({stroke3: "#FFD300"});
        this.setState({stroke4: "#FFD300"});
        this.setState({fill4: "#FFD300"});
      }
      if(newColor === "Yellow and Blue"){
        this.setState({stroke3: "#0000FF"});
        this.setState({stroke4: "#0000FF"});
        this.setState({fill4:"#0000FF"});
        this.setState({stroke1: "#FFD300"});
        this.setState({stroke2: "#FFD300"});
        this.setState({fill2: "#FFD300"});
      }
    }

    establishStateData(data) {
      // console.log("establishStateData()", new Date());
  
      return{
        //arr1: data["displayArr1"],
        // arr2: data["displayArr2"],
        // arr3: data["displayArr3"],
        //arr4: data["displayArr4"],
        xPos1: data["xPos1"],
        yPos1: data["yPos1"],
        xPos2: data["xPos2"],
        yPos2: data["yPos2"],
        xPos3: data["xPos3"],
        yPos3: data["yPos3"],
        xPos4: data["xPos4"],
        yPos4: data["yPos4"],
        stroke1: data["stroke1"],
        stroke2: data["stroke2"],
        stroke3: data["stroke3"],
        stroke4: data["stroke4"],
        fill1: data["fill1"],
        fill2: data["fill2"],
        fill3: data["fill3"],
        fill4: data["fill4"],
        height: 1000,
        width: data["width"],
        rad:data["circRad"],
        minVal:1,
        sliderPos:8,
        sliderPos2:5,
        rect1Width: 100,
        rect2Width: 100,
        rect3Width: 100,
        rect4Width: 100,
        rectHeight:20,
        displayArr1 : data["displayArr1"],
        displayArr2 : data["displayArr2"],
        displayArr3 : data["displayArr3"],
        displayArr4 : data["displayArr4"],
        displayVal1: 2,
        displayVal2: 1,
        maxVal : data["maxVal"],
        legendKey : data["legendKey"],
        displayArr5 : data["displayArr5"],
        refArr5 : data["refArr5"]
      }
    }



dotReturn1(xPos, yPos) {
    var hard = 
    <circle 
    // onMouseEnter={e => this.displayTag1(e)}
    // onMouseLeave={e => this.hideTag1(e)}
    // onMouseMove={e => this.updateTag1(e)} 
    className="icon" 
    stroke={this.state.stroke1} 
    fill={this.state.fill1}
    fillOpacity="1" 
    strokeOpacity="1" cx={xPos} cy={yPos} r={this.state.rad}>
    </circle>;

    return hard;
  }

   dotReturn2(xPos, yPos) {
    var hard = 
    <circle 
    // onMouseEnter={e => this.displayTag1(e)}
    // onMouseLeave={e => this.hideTag1(e)}
    // onMouseMove={e => this.updateTag1(e)} 
    className="icon" 
    stroke={this.state.stroke2} 
    fill={this.state.fill2}
    fillOpacity="1" 
    strokeOpacity="1" cx={xPos} cy={yPos} r={this.state.rad}>
    </circle>;

    return hard;
  }

   dotReturn3(xPos, yPos) {

    var hard = 
    <circle 
    // onMouseEnter={e => this.displayTag1(e)}
    // onMouseLeave={e => this.hideTag1(e)}
    // onMouseMove={e => this.updateTag1(e)} 
    className="icon" 
    stroke={this.state.stroke3} 
    fill={this.state.fill3}
    fillOpacity="1" 
    strokeOpacity="1" cx={xPos} cy={yPos} r={this.state.rad}>
    </circle>;

    return hard;
  }

   dotReturn4(xPos, yPos) {
    var hard = 
    <circle 
    // onMouseEnter={e => this.displayTag1(e)}
    // onMouseLeave={e => this.hideTag1(e)}
    // onMouseMove={e => this.updateTag1(e)} 
    className="icon" 
    stroke={this.state.stroke4} 
    fill={this.state.fill4}
    fillOpacity="1" 
    strokeOpacity="1" cx={xPos} cy={yPos} r={this.state.rad}>
    </circle>;

    return hard;
  }

  textReturn(xPos, yPos, tedxt){
    var hard = <text x = {xPos} y = {yPos}>{tedxt}</text>;
    return hard;
  }
  textReturn2(xPos, yPos, tedxt){
    var hard = <text x = {xPos} y = {yPos}>{tedxt}</text>;
    return hard;
  }
  textReturn3(xPos, yPos, tedxt){
    var hard = <text x = {xPos} y = {yPos}>{tedxt}</text>;
    return hard;
  }
  textReturn4(xPos, yPos, tedxt){
    var hard = <text x = {xPos} y = {yPos}>{tedxt}</text>;
    return hard;
  }

  rectReturn1(xPos, yPos){
    var hard = 
    <rect
    x = {xPos} y = {yPos} stroke = {this.state.stroke1} fill = {this.state.stroke1} height = {this.state.rectHeight-2} width = {this.state.rect1Width} fillOpacity = "0.7" strokeOpacity = "0.7"></rect>;
    return hard;
  }

  rectReturn2(xPos, yPos){
    var hard = 
    <rect
    x = {xPos} y = {yPos +1} stroke = {this.state.stroke1} height = {this.state.rectHeight-2} width = {400} fill = {"none"} strokeOpacity = "0.3"></rect>;
    return hard;
  }
  rectReturn3(xPos, yPos){
    var hard = 
    <rect
    x = {xPos} y = {yPos +1} stroke = {this.state.stroke2} height = {this.state.rectHeight-2} width = {this.state.rect2Width} fillOpacity = "0.7" fill = {this.state.stroke2} strokeOpacity = "0.7"></rect>;
    return hard;
  }
  rectReturn4(xPos, yPos){
    var hard = 
    <rect
    x = {xPos} y = {yPos +1} stroke = {this.state.stroke2} height = {this.state.rectHeight-2} width = {400} fill = {"none"} strokeOpacity = "0.7"></rect>;
    return hard;
  }
  rectReturn5(xPos, yPos){
    var hard = 
    <rect
    x = {xPos} y = {yPos +1} stroke = {this.state.stroke3} height = {this.state.rectHeight-2} width = {this.state.rect3Width} fillOpacity = {0.7} fill = {this.state.fill4} strokeOpacity = "0.7"></rect>;
    return hard;
  }
  rectReturn6(xPos, yPos){
    var hard = 
    <rect
    x = {xPos} y = {yPos +1} stroke = {this.state.stroke3} height = {this.state.rectHeight-2} width = {400} fill = {"none"} fillOpacity = {0.7}strokeOpacity = "0.7"></rect>;
    return hard;
  }
  rectReturn7(xPos, yPos){
    var hard = 
    <rect
    x = {xPos} y = {yPos} stroke = {this.state.stroke4} height = {this.state.rectHeight-2} fill = {this.state.fill4} fillOpacity = {0.7} width = {this.state.rect4Width} strokeOpacity = "0.7"></rect>;
    return hard;
  }
  rectReturn8(xPos, yPos){
    var hard = 
    <rect
    x = {xPos} y = {yPos +1} stroke = {this.state.stroke4} height = {this.state.rectHeight-2} width = {400} fill = {"none"} strokeOpacity = "0.3"></rect>;
    return hard;
  }

  render() {
    return (
      <div>
        <svg width={this.state.width + 400} height={this.state.height + 10} ref={this.svgRef}>
        {[...this.state.xPos1].map(
          (col, index) =>
            (this.dotReturn1(col,this.state.yPos1[index]))
        )}
        {this.dotReturn1(this.state.width +220,this.state.height/6 + 70)}
        {[...this.state.xPos2].map(
          (col, index) =>
            (this.dotReturn2(col,this.state.yPos2[index]))
        )}
        {this.dotReturn2(this.state.width +220, this.state.height/6 + 40)}
        {[...this.state.xPos3].map(
          (col, index) =>
            (this.dotReturn3(col,this.state.yPos3[index]))
        )}
        {this.dotReturn3(this.state.width +220, this.state.height/4 +28)}
        {this.dotReturn4(this.state.width +220, this.state.height/4 +48)}

        {[...this.state.xPos4].map(
          (col, index) =>
            (this.dotReturn4(col,this.state.yPos4[index]))
        )}
        {this.textReturn(this.state.width + 240, this.state.height/4 + 32, this.state.legendKey[0])}
        {this.textReturn(this.state.width + 240, this.state.height/4 + 52, this.state.legendKey[1])}
        {this.textReturn(this.state.width + 240, this.state.height/4 - 8, this.state.legendKey[2])}
        {this.textReturn(this.state.width + 240, this.state.height/4 - 39, this.state.legendKey[3])}
        {[...this.state.displayArr5].map(
          (b, index) =>
            (this.textReturn(this.state.refArr5[index] + 15, 265, b))
        )}
        {this.rectReturn1(this.state.width/2.5,600)}
        {this.rectReturn2(this.state.width/2.5,600)}
        {this.rectReturn3(this.state.width/2.5,650)}
        {this.rectReturn4(this.state.width/2.5,650)}
        {this.rectReturn5(this.state.width/2.5,700)}
        {this.rectReturn6(this.state.width/2.5,700)}
        {this.rectReturn7(this.state.width/2.5,750)}
        {this.rectReturn8(this.state.width/2.5,750)}
        </svg>
        <div>
        <input type="range" min={this.state.minVal} max={this.state.maxVal} 
              className="hist-slider" onChange={this.onChange1}
              name="sliderPos" value={this.state.sliderPos} ref={this.sliderRef}
              style={{ width: this.state.width, left:115}}/>
            <input type = "range" min = {this.state.minVal} max = {this.state.maxVal}
            className = "hist-slider-two" onChange={this.onChange2}
            name = "sliderPos2" value = {this.state.sliderPos2} ref = {this.slider2Ref}
            style = {{width: this.state.width, left:115}}/>
        </div>  
                <label>Choose a color combination (the first color is on top): </label>
                  <select name="stroke1" id="stroke1" ref={this.stroke1Ref}
                    defaultValue={this.state.stroke1}>
                    <option value="#0000FF">Blue and Red</option>
                    <option value="#FF0000">Red and Blue</option>
                    <option value="Orange and Blue">Orange and Blue</option>
                    <option value="Blue and Orange">Blue and Orange</option>
                    <option value = "Yellow and Blue">Yellow and Blue</option>
                    <option value = "Blue and Yellow">Blue and Yellow</option>
                  </select>
                  <input onClick={() => this.changeStroke1()} type="submit" value="Submit"></input>
                  <br></br>
                  </div>
    )
  }
}

export default ThresholdCurve;
