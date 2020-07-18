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
      checked: false
    }

    this.handleChange = this.handleChange.bind(this);
  }

  delete() {
    this.props.delete(this.props.count);
  }

  getCount() {
    this.props.getCount(this.props.count);
  }

  handleChange(type, q, count) {
    this.props.handleChange(type, q, count);
  }

  componentDidMount() {
  }

  render() {
    return (
      <form className="unit">
        <p>Drag the slider and click confirm</p>
        <p>Question: <input onInput={() => this.handleChange("Question", this.qRef.current.value, this.props.count)} ref={this.qRef} type="text" /></p>
        <input type="range" min="1" max="100" defaultValue="50" className="slider" name="myRange" id="myRange" ref={this.sliderRef} />
        <p>Minimum: <input onInput={() => this.handleChange("lowRange", this.minRef.current.value, this.props.count)} ref={this.minRef} type="text" /></p>
        {/* <p>Value: <span id="slider1" ref={this.outputRef}></span></p> */}
        <p>Maximum: <input onInput={() => this.handleChange("highRange", this.maxRef.current.value, this.props.count)} ref={this.maxRef} type="text" /></p>
        <p onClick={this.delete.bind(this)}>Delete</p>
      </form>
    )
  }
}

export default SliderTab;