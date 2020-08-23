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
    this.keyRef = React.createRef();

    // console.log(this.props);

    this.state = {
      checked: false,
      minVal: Number,
      maxVal: Number
    }

    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.appendToKeysArr = this.appendToKeysArr.bind(this);
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
    if (this.props.imported) {
      this.handleChange("Question", this.props.defaultQ, this.props.count);
      this.handleChange("lowRange", this.props.defaultMin, this.props.count);
      this.handleChange("highRange", this.props.defaultMax, this.props.count);
    }
  }

  appendToKeysArr(objType, nameType, csvColName, count) {
    this.props.appendToKeysArr(objType, nameType, csvColName, count);
  }

  render() {
    const qNum = this.props.count + 1;
    return (
      <form className="unit">
        <br/>
        Question #{qNum} 
        <br/><br/>
        <p>Enter your question below:
        <br/>
        <input onInput={() => this.handleChange("Question", this.qRef.current.value, this.props.count)} 
          ref={this.qRef} type="text" defaultValue={this.props.defaultQ}/></p><br/>
        {/* { this.qRef.current.value == null ? this.props.min : this.qRef.current.value } */}
        <input type="range" min="1" max="100" defaultValue="50" className="slider" name="myRange" id="myRange" ref={this.sliderRef} />
        {this.state.maxVal} <br/>
        <p>Minimum: 
          <input onInput={() => this.handleChange("lowRange", this.minRef.current.value, this.props.count)} 
          ref={this.minRef} type="text" 
          defaultValue={this.props.defaultMin}
          // name="minVal" value={this.state.minVal} onChange={this.onChange}
          /></p><br/>
        {/* <p>Value: <span id="slider1" ref={this.outputRef}></span></p> */}
        <p>Maximum: <input onInput={() => this.handleChange("highRange", this.maxRef.current.value, this.props.count)} 
          ref={this.maxRef} type="text" 
          defaultValue={this.props.defaultMax}
          // name="maxVal" value={this.state.maxVal} onChange={this.onChange}
          /></p>
        <br/><br/>
        What csv column name do you want to assign to this question? <br/>
        <b>Please use letters only, and the name must be unique.</b> <br/>
        Recommedation: include your experiment name, this question number 
        ({qNum}), and the question type (slider)
        <br/>
        <input type="text" ref={this.keyRef} 
          onInput={() => {
            // this.appendToKeysArr(
            //   "csvColNames", 
            //   "slider-question-key", 
            //   this.keyRef.current.value, 
            //   this.props.count);
            this.handleChange("slider-question-key", this.keyRef.current.value, this.props.count)
            // this.appendToKeysArr(
            //   "keyValuePairs",
              
            // )
          }}/>
        <br/><br/>
        <button onClick={this.delete.bind(this)}>Delete</button>
      </form>
    )
  }
}

export default SliderTab;