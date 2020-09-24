import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  getStudyInfo
} from "../../actions/dataActions"

class TabBuilder extends Component {
  constructor(props) {
    super(props);
    this.selectRef = React.createRef();
    this.importQRef = React.createRef();
  }

  componentDidMount() {
    // username and studyName are passed from TabList.jsx
    const username = this.props.username;
    const studyName = this.props.studyName;
    this.props.getStudyInfo(username, studyName);
  }

  // ###TODO###: add more switch statements here when adding a new component
  // ###TODO###: the switch statement is not super necessary, pls improve
  /**
   * Convert question type to its key in json
   * @param {[String]} qType [question type]
   */
  mapQTypetoQKey(qType) {
    switch(qType) {
      case "slider":
        return "slider-question-key"
      case "static-text":
        return "static-text-key"
      case "normal-curve":
        return "normal-curve-question-key"
      case "threshold":
        return "threshold-key"
      default:
        return ""
    }
  }

  render() {
    var allGroups;
    // this object contains the mapping from questions to their experiment
    var qSelectedToExptname = {};
    // the following block of code generates the content of a dropdown menu
    // for researchers to select which question them want to import 
    if (!this.props.experiments.length == 0) {
      const allExpts = this.props.experiments;
      const renderOption = item => <option value={item}>{item}</option>
      // per experiment
      // input: item represents a JSON object containing the configuration data
      //        of a specific experiment 
      const renderGroup = item => {
        const qKeys = Object.keys(item).filter(
          k => k.charAt(0) == "q");
        // qArr contains all csvColNames of all questions in an experiment
        var qArr = [];
        qKeys.forEach(k => {
          const question = item[k]; 
          const qKey = this.mapQTypetoQKey(question["Type"]);
          const csvColName = question[qKey];
          qArr.push(csvColName);
        })
        qArr.map(q => qSelectedToExptname[q] = item.exptName);
        const qOptions = qArr.map(renderOption);
        return (
          <optgroup label={item.exptName}>
            {qOptions}
          </optgroup>
        )
      }
      allGroups = allExpts.map(renderGroup);
    }

    return (
      <div>
        <br/>
        <div className="boxed"> 
          <span>Choose what element to add next</span><br />
          <select name="tabType" id="tabType" ref={this.selectRef}>
            {/* <option value="slider">Slider</option> */}
            <option value="static-text">Static Text</option>
            <option value="normal-curve">Normal Curve</option>
            <option value="threshold">Threshold</option>
          </select>
          <button onClick={() => this.props.build(this.selectRef.current.value)}>+</button>
          <br/><br/>
          OR
          <br/><br/>
          {
            this.props.experiments.length == 0 
            ? 
            <div>
              Cannot import question from another experiment because there are no 
              experiments in this study yet.
            </div>
            :
            <div>
              <span>Import a question from another experiment in this study</span><br/>
              <select name="importQue" id="importQue" ref={this.importQRef}>
                {allGroups}
              </select>
              <button onClick={() => 
                // importQuestion lives in TabList.jsx
                this.props.importQuestion(
                  qSelectedToExptname[this.importQRef.current.value], 
                  this.importQRef.current.value)}>
                +
              </button>
            </div>
          }
        </div>
      </div>
    ) 
  }
}

TabBuilder.propTypes = {
  getStudyInfo: PropTypes.func.isRequired,
  experiments: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  experiments: state.dataFlow.studyInfo
})

export default connect(
  mapStateToProps,
  { getStudyInfo }
)(TabBuilder);