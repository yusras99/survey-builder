import React, { Component } from 'react';
import './SliderTab.css';

class SliderTab extends Component {
  constructor(props) {
    super(props);
    this.sliderRef = React.createRef();
    this.outputRef = React.createRef();
    this.qRef = React.createRef();
    this.minRef = React.createRef();
    this.maxRef = React.createRef();
    this.state = { min: 1, max: 100 }

    // console.log(this.props);

    this.state = {
      checked: false,
      minVal: Number,
      maxVal: Number
    }

    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
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

  componentDidMount() {
  }

  render() {
    return (
      <form className="unit">
        <p>Question: <input onInput={() => this.handleChange("Question", this.qRef.current.value, this.props.count)} ref={this.qRef} type="text" /></p><br/>
        {this.state.minVal}
        <input type="range" min="1" max="100" defaultValue="50" className="slider" name="myRange" id="myRange" ref={this.sliderRef} />
        {this.state.maxVal} <br/>
        <p>Minimum: 
          <input onInput={() => this.handleChange("lowRange", this.minRef.current.value, this.props.count)} 
          ref={this.minRef} type="text" 
          name="minVal" value={this.state.minVal} onChange={this.onChange}/></p><br/>
        {/* <p>Value: <span id="slider1" ref={this.outputRef}></span></p> */}
        <p>Maximum: <input onInput={() => this.handleChange("highRange", this.maxRef.current.value, this.props.count)} 
          ref={this.maxRef} type="text" 
          name="maxVal" value={this.state.maxVal} onChange={this.onChange}/></p><br/>
        <button onClick={this.delete.bind(this)}>Delete</button>
      </form>
    )
  }
}

export default SliderTab;