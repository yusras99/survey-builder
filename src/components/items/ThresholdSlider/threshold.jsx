import React, { Component } from 'react';
import './ThresholdSlider.css';
import Dropzone, { useDropzone } from "react-dropzone";
import { gsap } from 'gsap'
import {TweenMax, Draggable} from "gsap/all";

import { json } from 'd3';
import { Tween } from 'gsap/gsap-core';

// --------- TODO ----------
// set up bottom slider
// record positions such that the 4 boxes move accordingly
// calculate snap positions in python code
// add more fields for researchers (legend names, question, ...)
// set up dataflow (save researcher configuration to database)
// add component to participant app (pull researcher config from database)
// for now threshold requires drag and drop, will be nice if it follows the same
// format as normal curve (give researchers 3 options to select from and then
// further configure)

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
      this.refLine6Ref = React.createRef();
      this.refLine5Ref = React.createRef();
      this.refLine7Ref = React.createRef();
      this.refLine8Ref = React.createRef();
      this.refLine9Ref = React.createRef();
      this.refLine10Ref = React.createRef();

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
      this.line1 = this.line1.bind(this);
      this.line2 = this.line2.bind(this);
      this.line3 = this.line3.bind(this);
      this.onChange2 = this.onChange2.bind(this);
      this.onChange4 = this.onChange4.bind(this);
      this.onChange5 = this.onChange5.bind(this);

      this.onChange6 = this.onChange6.bind(this);

      this.onChange7 = this.onChange7.bind(this);

      this.onChange8 = this.onChange8.bind(this);


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
      this.textReturn2 = this.textReturn2.bind(this);



      this.establishStateData = this.establishStateData.bind(this);
      //this.updateRadius = this.updateRadius.bind(this);
      //this.changeColor1 = this.changeColor1.bind(this);
      //this.changeColor2 = this.changeColor2.bind(this);
      //this.changeJSON = this.changeJSON.bind(this);
      //this.onUpdateShapes = this.onUpdateShapes.bind(this);
      //this.onFinishShapes = this.onFinishShapes.bind(this);   
      this.state = this.establishStateData(this.props.data);
    }

    onChange4(q) {
      this.setState({rect3Width : q})
    }

    onChange1(e) {
      this.setState({ [e.target.name]: e.target.value })
      this.setState({rect1Width : 400*this.state.displayArr1[e.target.value-1]})
      this.setState({rect2Width: 400*this.state.displayArr2[e.target.value-1]})
    }
    onChange2(e) {
      this.setState({rect4Width: 400*this.state.displayArr4[e.target.value-1]})
      this.setState({rect3Width: 400*this.state.displayArr3[e.target.value-1]})
      this.setState({ [e.target.name]: e.target.value })
    }
    line1(xPos1,xPos2,yPos1,yPos2){
      var hard = <line x1 = {xPos1} x2 = {xPos2} y1 = {yPos1} y2 = {yPos2} stroke = "#000000"></line>;
      return hard;
    }
    line2(xPos1,xPos2,yPos1,yPos2){
      var dottedLine = [];
      for(var i = 0; i < yPos2 - yPos1; i+=4){
        var hard = <line x1 = {xPos1} x2 = {xPos1} y1 = {yPos1 + i} y2 = {yPos2 + i + 2} stroke = "#808080"></line>;
        dottedLine.push(hard);
      }
      return dottedLine;
    }

    line3(xPos1,xPos2,yPos1,yPos2){
      var hard = <line x1 = {this.state.placement1} x2 = {this.state.placement1} y1 = {yPos1} y2 = {yPos2} stroke = "#808080"   strokeWidth="2"></line>;
      return hard;
    }
    line4(xPos1,xPos2,yPos1,yPos2){
      var hard = <line x1 = {this.state.placement2} x2 = {this.state.placement2} y1 = {yPos1} y2 = {yPos2} stroke = "#808080"   strokeWidth="2"  stroke-dasharray = "4"></line>;
      return hard;
    }
    line5(xPos1,xPos2,yPos1,yPos2){
      var hard = <line x1 = {this.state.placement3} x2 = {this.state.placement3} y1 = {yPos1} y2 = {yPos2} stroke = "#808080"   strokeWidth="2"></line>;
      return hard;
    }
    line6(xPos1,xPos2,yPos1,yPos2){
      var hard = <line x1 = {this.state.placement4} x2 = {this.state.placement4} y1 = {yPos1} y2 = {yPos2} stroke = "#808080"   strokeWidth="2" stroke-dasharray = "4"></line>;
      return hard;
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
    onChange5(e){
      this.setState({placement1:e})
    }
    onChange6(e){
      this.setState({placement2:e})
    }
    onChange7(e){
      this.setState({placement3:e})
    }
    onChange8(e){
      this.setState({placement4:e})
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
        legend: data["legend"],
        placement1:200,
        placement2:300,
        placement3:500,
        placement4:800,
        key: data["displayArr5"],
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
        rad: data["circRad"],
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
        labels: data["legend"],
        thumbDown: false,
        topSliderX: 0,
        topSliderY: 60,
        bottomSliderX: 90,
        bottomSliderY: 175,
        dragger1Pos: 0,
        dragger2Pos: 0
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
    var hard = <text x = {xPos} y = {yPos} fontSize = "10">{tedxt}</text>;
    return hard;
  }
  textReturn2(xPos, yPos, tedxt){
    var hard = <text x = {xPos} y = {yPos} fontSize = "12" color = "grey">{tedxt}</text>;
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
  /**
   * Set up dragger when the component mounts
   */
  /**
   * Renders a dragger in the svg
   */

  
  // not finished

  render() {
    const widthFactor = 6;
    const heightFactor = 3.5;
    // TODO: change padding so that the entire graph is in the center of the box
    return (
      <div style={{ backgroundColor: "pink" }}>
        <svg width={this.state.width} height={this.state.height/2.5} ref={this.svgRef}>

          {/* rows of dots */}
          {[...this.state.xPos1].map(
            (col, index) =>
              (this.dotReturn1(col + 13,this.state.yPos1[index] - 100))
          )}

          {[...this.state.xPos2].map(
            (col, index) =>
              (this.dotReturn2(col + 13,this.state.yPos2[index]- 100))
          )}

          {[...this.state.xPos3].map(
            (col, index) =>
              (this.dotReturn3(col + 13,this.state.yPos3[index] - 100))
          )}
          
          {[...this.state.xPos4].map(
            (col, index) =>
              (this.dotReturn4(col + 13,this.state.yPos4[index] - 100))
          )}
                    
          {/* legend dots */}
          {/* {this.dotReturn1(this.state.width +220,this.state.height/6 + 70)}
          {this.dotReturn2(this.state.width +220, this.state.height/6 + 40)}
          {this.dotReturn3(this.state.width +220, this.state.height/4 +28)}
          {this.dotReturn4(this.state.width +220, this.state.height/4 +48)} */}
          {this.dotReturn1(810,20)}
          {this.dotReturn3(820, 20)}
          {this.dotReturn2(810, 30)}
          {this.dotReturn4(820, 30)}

          {/* legend texts */}
          {/* {this.textReturn(this.state.width + 240, this.state.height/4 + 32, this.state.legendKey[0])}
          {this.textReturn(this.state.width + 240, this.state.height/4 + 52, this.state.legendKey[1])}
          {this.textReturn(this.state.width + 240, this.state.height/4 - 8, this.state.legendKey[2])}
          {this.textReturn(this.state.width + 240, this.state.height/4 - 39, this.state.legendKey[3])} */}
          {this.textReturn(830, 25, this.state.legendKey[0])}
          {this.textReturn(830, 35, this.state.legendKey[1])}
          {this.textReturn2(5, 25, this.state.legendKey[2])}
          {this.textReturn2(5, 255, this.state.legendKey[3])}
          {/* indices for columns */}
          {this.textReturn(this.state.placement1 - 10,45,this.state.labels[0])}
          {this.textReturn(this.state.placement2 - 10,45,this.state.labels[1])}
          {this.textReturn(this.state.placement3 - 10,245,this.state.labels[2])}
          {this.textReturn(this.state.placement4 - 10,245,this.state.labels[3])}

          {this.line4(this.placement1,this.placement1,50,125)}
          {this.line5(this.placement2,this.placement2,160,235)}
          {this.line3(this.placement3,this.placement3,50,125)}
          {this.line6(this.placement4,this.placement4,160,235)}
          {this.textReturn(35,165,this.state.key[0])}
          {this.textReturn(135,165,this.state.key[1])}
          {this.textReturn(235,165,this.state.key[2])}
          {this.textReturn(335,165,this.state.key[3])}
          {this.textReturn(435,165,this.state.key[4])}
          {this.textReturn(535,165,this.state.key[5])}
          {this.textReturn(635,165,this.state.key[6])}
          {this.textReturn(735,165,this.state.key[7])}
          {this.textReturn(835,165,this.state.key[8])}
          {this.textReturn(935,165,this.state.key[9])}

          {/* rectangular bars */}
          {/* {this.rectReturn1(this.state.width/2.5,600)}
          {this.rectReturn2(this.state.width/2.5,600)}
          {this.rectReturn3(this.state.width/2.5,650)}
          {this.rectReturn4(this.state.width/2.5,650)}
          {this.rectReturn5(this.state.width/2.5,700)}
          {this.rectReturn6(this.state.width/2.5,700)}
          {this.rectReturn7(this.state.width/2.5,750)}
          {this.rectReturn8(this.state.width/2.5,750)} */}
          {this.rectReturn1(this.state.width/2.5 - 100,this.state.height/heightFactor - 2 * this.state.rad)}
          {this.rectReturn2(this.state.width/2.5- 100,this.state.height/heightFactor - 2 * this.state.rad)}
          {this.textReturn2(this.state.width/2.5+ 80,this.state.height/heightFactor - 2 * this.state.rad - 8, this.state.legend[0])}
          {this.rectReturn3(this.state.width/2.5 - 100,this.state.height/heightFactor + 30 - 2 * this.state.rad)}
          {this.rectReturn4(this.state.width/2.5 - 100,this.state.height/heightFactor + 30 - 2 * this.state.rad)}
          {this.textReturn2(this.state.width/2.5 +80,this.state.height/heightFactor + 30 - 2 * this.state.rad, this.state.legend[1])}
          {this.rectReturn5(this.state.width/2.5 - 100,this.state.height/heightFactor + 60 - 2 * this.state.rad)}
          {this.rectReturn6(this.state.width/2.5 - 100,this.state.height/heightFactor + 60 - 2 * this.state.rad)}
          {this.textReturn2(this.state.width/2.5 + 80,this.state.height/heightFactor + 60 - 2 * this.state.rad, this.state.legend[2])}
          {this.rectReturn7(this.state.width/2.5 - 100,this.state.height/heightFactor + 90 - 2 * this.state.rad)}
          {this.rectReturn8(this.state.width/2.5 - 100,this.state.height/heightFactor + 90 - 2 * this.state.rad)}
          {this.textReturn2(this.state.width/2.5 + 80,this.state.height/heightFactor + 90 - 2 * this.state.rad, this.state.legend[3])}

          {/* sliders */}

        </svg>
      

        <div>
        <input type="range" min={this.state.minVal} max={this.state.maxVal} 
              className="thresh-top-slider" onChange={this.onChange1}
              name="sliderPos" value={this.state.sliderPos} ref={this.sliderRef}
              style={{ width: this.state.width, left:0}}/>
        <input type = "range" min = {this.state.minVal} max = {this.state.maxVal}
            className = "thresh-bottom-slider" onChange={this.onChange2}
            name = "sliderPos2" value = {this.state.sliderPos2} ref = {this.slider2Ref}
            style = {{width: this.state.width, left:0}}/>
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
                  <input name = "refLine5" id = "refLine5" ref = {this.refLine5Ref}></input>
                  <input onClick = {() => this.onChange5(this.refLine5Ref.current.value)} type = "submit" value = "Submit"></input> 
                  <br></br>
                  <input name = "refLine6" id = "refLine6" ref = {this.refLine6Ref}></input>
                  <input onClick = {() => this.onChange6(this.refLine6Ref.current.value)} type = "submit" value = "Submit"></input> 
                  <br></br>
                  <input name = "refLine7" id = "refLine7" ref = {this.refLine7Ref}></input>
                  <input onClick = {() => this.onChange7(this.refLine7Ref.current.value)} type = "submit" value = "Submit"></input> 
                  <br></br>
                  <input name = "refLine8" id = "refLine8" ref = {this.refLine8Ref}></input>
                  <input onClick = {() => this.onChange8(this.refLine8Ref.current.value)} type = "submit" value = "Submit"></input> 

      </div>
    )
  }
}

export default ThresholdCurve;
