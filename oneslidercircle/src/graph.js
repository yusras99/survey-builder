import React, { Component } from 'react';
import * as d3 from "d3";
import './HistSlider.css';

class Histogram extends Component {
  constructor(props) {
    super(props);
    
    this.sliderRef = React.createRef();
    this.graphRef = React.createRef();
    this.qRef = React.createRef();
    this.minRef = React.createRef();
    this.maxRef = React.createRef();
    this.color1Ref = React.createRef();
    

    this.state = {
      checked: false,
      minVal: 0,
      maxVal: 10,
      sliderPos: Number,
      color1: "#FF0000",
      firstDisplayArr: [75.0, 72.22222222222223, 70.0, 65.4320987654321, 64.91228070175438, 60.294117647058826, 56.875, 55.19125683060109, 54.85436893203884, 55.65217391304348, 100],
      secondDisplayArr:[0, 62.5, 57.4468085106383, 52.857142857142854, 48.93617021276596, 46.55172413793103, 50.33557046979866, 50.588235294117645, 52.577319587628864, 54.205607476635514, 55.65217391304348],
      firstDisplay: "Percent Needlessly Jailed",
      secondDisplay: "Percent Re-arrested",
      firstPop: "population 1",
      secondPop: "population 2",
    }

    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
      this.changeColor1 = this.changeColor1.bind(this);
  }

  componentDidMount() {
    this.drawChart();
  }

  changeColor1() {
    const newColor = this.color1Ref.current.value;
    this.setState({ color1 : newColor });
    const data = this.props.data;
    const arr4 = [ {'x': 750, 'y': 235.0, 'op': '1', 'col': this.state.color1, 'stroke': this.state.color1},
    {'x': 750.0, 'y': 214.0, 'op': '1', 'col': this.state.color1, 'stroke': this.state.color1},
    {'x': 750, 'y': 280.0, 'op': '1', 'col': '#00FF00', 'stroke': '#00FF00'},
    {'x': 750.0, 'y': 301.0, 'op': '1', 'col': 'none', 'stroke': '#00FF00'}];
    const svg = d3.select(this.graphRef.current)

    svg.selectAll("legend")
        .data(arr4)
        .enter()
        .append("circle")
        .attr("cx", 100)
        .attr("cy", 100)
        .attr("r", 4)
        .attr("fill", this.state.color1)
        .attr("stroke", this.state.color1)
        .attr("opacity", 1)

  }


  delete() {
    this.props.delete(this.props.count);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleChange(type, q, count) {
    this.props.handleChange(type, q, count);
  }

  drawChart() {
    const data = this.props.data;
    const arr3 = [1,2,3,4,5,6,7,8,9,10];
    const arr4 = [ {'x': 750, 'y': 235.0, 'op': '1', 'col': this.state.color1, 'stroke': this.state.color1},
    {'x': 750.0, 'y': 214.0, 'op': '1', 'col': this.state.color1, 'stroke': this.state.color1},
    {'x': 750, 'y': 280.0, 'op': '1', 'col': '#00FF00', 'stroke': '#00FF00'},
    {'x': 750.0, 'y': 301.0, 'op': '1', 'col': 'none', 'stroke': '#00FF00'}];
    const arr5 = [{"txt":"first Population arrested",'x':750,'y':235},
    {'txt':"first Population not rearrested", 'x':750,'y':214},
    {'txt':"Second Population arrested",'x':750,'y':280},
    {'txt' :"Second Population not rearrested",'x':750,'y':301} ];
    const arr6 = [1,2,3,4];
    const svg = d3.select(this.graphRef.current).append("svg")
      .attr("width", this.props.width + 350)
      .attr("height", this.props.height)
    svg.selectAll("text").remove()
    svg.selectAll("circle").remove()
    svg.selectAll("number")
        .data(arr3)
        .enter()
        .append("text")
        .attr("y", this.props.height/2 + 10)
        .attr("x", (d,i) => 32 *i*this.props.width/data.length + 30)
        .text((d)=>d)
        
    svg.selectAll("circle").remove()


    svg.selectAll("false")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d, i) => d.x + 10)
        .attr("cy", (d, i) => d.y)
        .attr("r", 4)
        .attr("fill", (d,i) => d.col)
        .attr("stroke", (d,i) =>d.stroke)
        .attr("opacity",(d,i)=>d.op)

    var legend = svg.selectAll("legend")
        .data(arr4)
        .enter()
        .append("circle")
        .attr("cx", (d, i) => d.x + 10)
        .attr("cy", (d, i) => d.y)
        .attr("r", 4)
        .attr("fill", (d,i) => d.col)
        .attr("stroke", (d,i) =>d.stroke)
        .attr("opacity",(d,i)=>d.op)

      svg.selectAll("number")
        .data(arr5)
        .enter()
        .append("text")
        .attr("y", (d,i) =>d.y + 5)
        .attr("x", (d,i) => d.x + 20)
        .text((d)=>d.txt)
  }
  render() {
    const vertAlign = this.props.height / 2;
    // const step_size = this.props.width / this.props.data.length;
    return (
      <div>
        <div ref={this.graphRef}
          style={{ 
            position: "relative", 
            width: this.props.width, 
            margin: "auto" }}>
          <div 
            style={{ 
              position: "absolute",
              top: vertAlign}}>
            <input type="range" min={this.state.minVal} max={this.state.maxVal} 
              className="hist-slider" onChange={this.onChange}
              name="sliderPos" value={this.state.sliderPos}
              step={this.props.step} ref={this.sliderRef}
              style={{ width: this.props.width }}/></div>
            <label for="color1">Choose a color for curve 1: </label>
                  <input type = "color" name = "color1" ref = {this.color1Ref}></input>
                  <input onClick={() => this.changeColor1()} type="submit" value="Submit"></input>
                  <br />
        </div>
        <h3>{this.state.firstDisplay} for {this.state.firstPop}: {this.state.firstDisplayArr[this.state.sliderPos]}</h3>
        <h3>{this.state.secondDisplay} for {this.state.secondPop}: {this.state.secondDisplayArr[this.state.sliderPos]}</h3>
        <h3>{this.state.color1}</h3>
        <br/>
              <button onClick={() => this.onUpdateShapes()}>
                Update 
              </button> <br/>
      </div>
    )
  }
}

export default Histogram;