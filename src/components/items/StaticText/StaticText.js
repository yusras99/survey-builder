import React, { Component } from 'react';

class StaticText extends Component {
  constructor(props) {
    super(props);
    this.qRef = React.createRef();

    // console.log(this.props);

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

  render() {
    return (
      <form className="unit">
        Enter your static text below: <br/>
        <textarea cols="60" rows="10" ref={this.qRef}
          onInput={() => this.handleChange("Static Text", this.qRef.current.value, this.props.count)}>
        </textarea>
      </form>
    )
  }
}

export default StaticText;