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
      showItems: false
    }

    this.onChange = this.onChange.bind(this);
    this.preBuild = this.preBuild.bind(this);
    this.showItem = this.showItem.bind(this);
    this.toggleShowItems = this.toggleShowItems.bind(this);
    this.button = this.button.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  item() {
    return (
      <div className="container">
        Hello
      </div>
    )
  }

  showItem() {
    console.log(this.state.numOfItems);
    return (
      <div>
        {/* {Array(this.state.numOfItems).fill(
          <div>
            Hello
          </div>
        )} */}
        {this.state.numOfItems}
      </div>
    )
  }

  toggleShowItems() {
    this.setState({ showItems: true })
  }

  button() {
    return (
      <div>
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
        How many items do you want to build? <br/><br/>
        <input type="text" name="numOfItems" value={this.state.numOfItems}
          onChange={this.onChange}/> <p></p>
          {
            !this.state.showItems && 
            <this.button/>
          }
        
      </div>
    )
  }

  render() {
    return (
      <div className="container">
        <h3>Experiment Builder</h3> <br/>
        {this.preBuild()} <br/>
        {/* {this.showItems()} */}
        { this.state.showItems && <this.showItem/>}
      </div>
    )
  }
}

export default BuildExpt;