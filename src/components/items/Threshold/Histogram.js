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

    this.state = {
      checked: false,
      minVal: Number,
      maxVal: Number,
      sliderPos: Number
    }

    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.drawChart();
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

    const svg = d3.select(this.graphRef.current).append("svg")
      .attr("width", this.props.width)
      .attr("height", this.props.height)

    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * this.props.width / data.length)
      .attr("y", (d, i) => this.props.height - 10 * d)
      .attr("width", this.props.width / data.length - 10)
      .attr("height", (d, i) => d * 10)
      .attr("fill", "#4CAF50")
      .attr("opacity", 0.5)

    svg.selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text((d) => d)
      .attr("x", (d, i) => i * this.props.width / data.length)
      .attr("y", (d, i) => this.props.height - (10 * d) - 3)
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
              style={{ width: this.props.width }}/>
          </div>
        </div>
        {this.state.minVal}
        <input type="range" class="dummy-slider" 
          style={{ width: this.props.width }} onChange={this.onChange}
          name="sliderPos" value={this.state.sliderPos} step={this.props.step}
          min={this.state.minVal} max={this.state.maxVal} />
        {this.state.maxVal}
        
        <br/><br/>
        <div className="boxed">
          Question: <br/>
          <textarea cols="60" rows="10" ref={this.qRef} 
            onInput={() => this.handleChange("Question", this.qRef.current.value, this.props.count)}>
          </textarea>

          <br/>
          <p>Minimum: 
            <input onInput={() => this.handleChange("lowRange", this.minRef.current.value, this.props.count)} 
            ref={this.minRef} type="text" 
            name="minVal" value={this.state.minVal} onChange={this.onChange}/></p>
          
          <br/>
          <p>Maximum: <input onInput={() => this.handleChange("highRange", this.maxRef.current.value, this.props.count)} 
            ref={this.maxRef} type="text" 
            name="maxVal" value={this.state.maxVal} onChange={this.onChange}/></p>

          <br/>
          <button onClick={this.delete.bind(this)}>Delete</button>
        </div>
      </div>
    )
  }
}

export default Histogram;