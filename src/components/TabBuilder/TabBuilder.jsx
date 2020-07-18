import React, { Component } from 'react';

class TabBuilder extends Component {
  constructor(props) {
    super(props);
    this.selectRef = React.createRef();
  }

  render() {
    return (
      <div className="unit">
        <span>Choose what element to add next</span><br />
        <select name="tabType" id="tabType" ref={this.selectRef}>
          <option value="slider">Slider</option>
          {/* <option value="normal-curve">Normal Curve</option> */}
        </select>
        <button onClick={() => this.props.build(this.selectRef.current.value)}>+</button>
      </div>
    )
  }
}

export default TabBuilder;