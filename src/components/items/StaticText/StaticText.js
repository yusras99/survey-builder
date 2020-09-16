import React, { Component } from 'react';

class StaticText extends Component {
  constructor(props) {
    super(props);
    this.qRef = React.createRef();
    this.keyRef = React.createRef();

    this.state = {
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
    // NOTE: import includes both "import question from another experiment" and
    //       "Edit experiment"
    if (this.props.imported) {
      // we only want to show the actual content because the question is imported 
      // (researchers may want to use different csv column names)
      this.handleChange("Static Text", this.props.qToDisplay["Static Text"], this.props.count);
    }; 
    if (this.props.editing) {
      // we want to show previous csv column names because researchers want to make edits
      this.handleChange("static-text-key", this.props.qToDisplay["static-text-key"], this.props.count);
    }; 
  }

  render() {
    const qNum = this.props.count + 1;
    return (
      <form className="unit">
        <br/>
        Question #{qNum} 
        <br/>
        Enter your static text below: <br/>
        {
          this.props.imported
          ?
          <textarea cols="60" rows="10" ref={this.qRef} 
          defaultValue={this.props.qToDisplay["Static Text"]}
          onInput={() => this.handleChange("Static Text", this.qRef.current.value, this.props.count)}>
          </textarea>
          :
          <textarea cols="60" rows="10" ref={this.qRef} 
          onInput={() => this.handleChange("Static Text", this.qRef.current.value, this.props.count)}>
          </textarea>
        }
        <br/><br/>
        What csv column name do you want to assign to this question? <br/>
        <b>Please use letters only, the name must be unique, leave no space between letters.</b> <br/>
        Recommedation: include your experiment name, this question number 
        ({qNum}), and the question type (staticText)
        <br/>
        {
          this.props.editing 
          ? 
          <input type="text" ref={this.keyRef} 
          defaultValue={this.props.qToDisplay["static-text-key"]}
          onInput={() => this.handleChange("static-text-key", this.keyRef.current.value, this.props.count)}/>
          :
          <input type="text" ref={this.keyRef} 
          onInput={() => this.handleChange("static-text-key", this.keyRef.current.value, this.props.count)}/>
        }
        <br/><br/>
        <button onClick={this.delete.bind(this)}>Delete</button>
      </form>
    )
  }
}

export default StaticText;