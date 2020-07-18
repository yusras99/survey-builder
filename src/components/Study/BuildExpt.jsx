import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class BuildExpt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exptName: '',
      numOfItems: Number,
      showItems: false,
      itemToSelect: ["slider", "normal curve"]
    }

    this.onChange = this.onChange.bind(this);
    this.preBuild = this.preBuild.bind(this);
    this.showItem = this.showItem.bind(this);
    this.toggleShowItems = this.toggleShowItems.bind(this);
    this.inputNumItems = this.inputNumItems.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  showItem() {
    console.log(this.state.numOfItems);
    const inputs = [];
    for (let i = 1; i <= this.state.numOfItems; i ++) {
      inputs.push(
        <div>
          Hello
        </div>
      )
    }
    return inputs;
  }

  toggleShowItems() {
    this.setState({ showItems: true })
  }

  inputNumItems() {
    return (
      <div>
        How many items do you want to build? <br/><br/>
        <input type="text" name="numOfItems" value={this.state.numOfItems}
          onChange={this.onChange}/> <p></p>
        <button class="btn" onClick={this.toggleShowItems}>Ok</button>
      </div>
    )
  }

  preBuild() {
    return (
      <div className="container">
        Enter experiment name: <br/><br/>
        <input type="text" name="exptName" value={this.state.exptName}
          onChange={this.onChange}/> <br/><br/>
          {
            !this.state.showItems && 
            <this.inputNumItems/>
          }
      </div>
    )
  }

  render() {
    return (
      <div className="container">
        <h3>Experiment Builder</h3> <br/>
        {this.preBuild()} <br/>
        { this.state.showItems && <this.showItem/>}
      </div>
    )
  }
}

export default BuildExpt;