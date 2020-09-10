import React, { Component } from 'react';
import './TabList.css';
import '../TabBuilder/TabBuilder'
import TabBuilder from '../TabBuilder/TabBuilder'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// ###TODO###: import your component here
import SliderTab from '../items/Slider/SliderTab';
import StaticText from '../items/StaticText/StaticText';
import NormalCurve from '../items/NormalCurve/NormalCurve';
import NormalCurveResearch from '../items/NormalCurve/NormalCurveResearch';
import HistogramResearch from '../items/Threshold/HistogramResearch';

import { 
  sendFile,
  getStudyInfo
} from '../../actions/dataActions'

const axios = require('axios');

// This component allows Psych researchers to configure an experiment 
class TabList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      children: [],
      count: 0,
      output: {},
      deleted: [],
      complete: false,
      exptName: '',
      files: [],
      expt: {}
    }
    this.myRef = React.createRef();
    this.submitRef = React.createRef();
    this.nameRef = React.createRef();

    this.builderFunction = this.builderFunction.bind(this);
    this.importQuestion = this.importQuestion.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.delete = this.delete.bind(this);
    this.getCount = this.getCount.bind(this);
    this.outputCreate = this.outputCreate.bind(this);
    this.checkOutput = this.checkOutput.bind(this);
    this.configDataToItem = this.configDataToItem.bind(this);
    this.saveFile = this.saveFile.bind(this);
    this.onChange = this.onChange.bind(this);
    this.appendToKeysArr = this.appendToKeysArr.bind(this);
  }

  componentDidMount() {
    const username = this.props.match.params.username;
    const studyName = this.props.match.params.studyName;
    this.props.getStudyInfo(username, studyName);
    console.log(this.props.location.state);
    if (this.props.location.state != null) {
      if (!this.props.location.state.newExpt) {
        const thisExpt = this.props.location.state.exptName;
        if (!this.props.experiments.length == 0) {
          const exptObj =
            this.props.experiments.find(item => item.exptName == thisExpt);
          this.setState({ expt: exptObj });
          const qKeys = Object.keys(exptObj).filter(key => key.charAt(0) == "q");
          var qArr = [];
          qKeys.forEach(key => qArr.push(exptObj[key]));
          qArr.forEach(q => {
            this.configDataToItem(q, true);
            this.setState({ count: this.state.count += 1 });
          });
          console.log("finished rendering items");
        };
      };
    };
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  builderFunction = (tabDefine) => {
    var arr = this.state.children;
    // ###TODO###: Add more cases here for TabList to display 
    //             Follow the format of the provided components below
    switch (tabDefine) {
      case "slider":
        arr.push({ 
          id: this.state.count, 
          tab: <SliderTab getCount={this.getCount} 
                  delete={this.delete} count={this.state.count} 
                  handleChange={this.handleChange} 
                  key={this.state.count.toString()}
                  appendToKeysArr={this.appendToKeysArr} /> 
        })
        break;
      case "static-text": 
        arr.push({
          id: this.state.count,
          tab: <StaticText getCount={this.getCount}
                  delete={this.delete} count={this.state.count}
                  handleChange={this.handleChange}
                  key={this.state.count.toString()}/>
        })
        break;
      case "normal-curve": 
        arr.push({
          id: this.state.count,
          tab: <NormalCurveResearch getCount={this.getCount} 
                  delete={this.delete} count={this.state.count} 
                  handleChange={this.handleChange} 
                  files={this.state.files} saveFile={this.saveFile}
                  key={this.state.count.toString()}/> 
        })
        break;  
      case "threshold":
        arr.push({
          id: this.state.count,
          tab: <HistogramResearch getCount={this.getCount} 
                  delete={this.delete} count={this.state.count}
                  handleChange={this.handleChange} 
                  files={this.state.files} saveFile={this.saveFile}
                  key={this.state.count.toString()}/>
        })
        break;
      default:
        arr = <div>Unknown Element</div>
    }

    var curOutput = this.state.output;
    curOutput[this.state.count.toString()] = { "Type": tabDefine };
    var newCount = this.state.count + 1;
    this.setState({ children: arr, count: newCount, output: curOutput, complete: false });
  }

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

  importQuestion(exptName, questionKey) {
    const thisExpt = this.props.experiments.filter(item => 
      item["exptName"] == exptName)[0];
    const thisExptQKeys = Object.keys(thisExpt).filter(k => 
      k.charAt(0) == "q");
    // the question key (e.g. q1) that user has selected
    const thisQKey = thisExptQKeys.filter(k => {
      const key = this.mapQTypetoQKey(thisExpt[k]["Type"]);
      return thisExpt[k][key] == questionKey;
    })[0];
    const questionToDisplay = thisExpt[thisQKey];
    console.log(questionToDisplay);

    // questions will show up once an expt type is pushed to this.state.children
    this.configDataToItem(questionToDisplay, false);
  }

  // input: question, a question in json format
  //        editing, a boolean indicating whether the component is displayed 
  //                  as part of "Edit Experiment"
  // output: a React component
  configDataToItem(question, editing) {
    var arr = this.state.children;
    switch (question["Type"]) {
      case "slider":
        arr.push({ 
          id: this.state.count, 
          tab: <SliderTab 
                  defaultQ={question["Question"]}
                  defaultMin={question["lowRange"]}
                  defaultMax={question["highRange"]}
                  imported={true}
                  editing={editing}
                  getCount={this.getCount} 
                  delete={this.delete} count={this.state.count} 
                  handleChange={this.handleChange} 
                  key={this.state.count.toString()}
                  appendToKeysArr={this.appendToKeysArr} /> 
        })
        break;
      case "static-text": 
        arr.push({
          id: this.state.count,
          tab: <StaticText 
                  qToDisplay={question}
                  imported={true}
                  editing={editing}
                  getCount={this.getCount}
                  delete={this.delete} count={this.state.count}
                  handleChange={this.handleChange}
                  key={this.state.count.toString()}/>
        })
        break;
      case "normal-curve": 
        arr.push({
          id: this.state.count,
          tab: <NormalCurveResearch 
                  qToDisplay={question}
                  imported={true}
                  editing={editing}
                  getCount={this.getCount} 
                  delete={this.delete} count={this.state.count} 
                  handleChange={this.handleChange} 
                  files={this.state.files} saveFile={this.saveFile}
                  key={this.state.count.toString()}/> 
        })
        break;  
      case "threshold":
        arr.push({
          id: this.state.count,
          tab: <HistogramResearch getCount={this.getCount} 
                  delete={this.delete} count={this.state.count}
                  handleChange={this.handleChange} 
                  files={this.state.files} saveFile={this.saveFile}
                  key={this.state.count.toString()}/>
        })
        break;
      default:
        arr = <div>Unknown Element</div>
    };

    var curOutput = this.state.output;
    curOutput[this.state.count.toString()] = { "Type": question["Type"] };
    var newCount = this.state.count + 1;
    this.setState({ children: arr, count: newCount, output: curOutput, complete: false });    
  }

  // Input: 
  //  key: key of JSON object
  //  value: value of JSON object
  //  count: the numerical order of the JSON object
  // Action: put the key and value pair in the final output JSON object
  handleChange(key, value, count) {
    var curOutput = this.state.output;
    curOutput[count.toString()][key] = value;
    this.setState({ output: curOutput });
  }

  appendToKeysArr(objType, nameType, csvColName, count) {
    var curOutput = this.state.output;
    const objKeys = Object.keys(curOutput[count.toString()]);
    // console.log(objKeys);
    if (objKeys.includes(objType)) {
      curOutput[count.toString()][objType][nameType] = csvColName;
    } else {
      curOutput[count.toString()][objType] = {};
      curOutput[count.toString()][objType][nameType] = csvColName;
    }
    console.log(curOutput);
    // curOutput[count.toString()]["csvColNames"]
  }

  delete(id) {
    var newDelete = this.state.deleted;
    newDelete.push(id);
    this.setState({ deleted: newDelete });
  }

  getCount(count) {
    return count;
  }

  // Action: put newly uploaded files into this.state. 
  //         All newly uploaded files will be sent to database as JSON objs
  saveFile(type, name, content) {
    const newFile = {
      "itemType": type,
      "fileName": name,
      "fileContent": content
    };
    this.setState({ files: this.state.files.concat(newFile) });
  }

  // validating input fields. 
  // for now: developers will need to add a case below 
  checkOutput(obj) {
    var int = 0;
    var complete = true;
    while ((int.toString()) in obj) {
      var elem = obj[int.toString()];
      switch (elem["Type"]) {
        case "slider":
          var lowIs = "lowRange" in elem;
          var highIs = "highRange" in elem;
          var qIs = "Question" in elem;
          if (lowIs && highIs && qIs) {
            var lowNum = !isNaN(elem["lowRange"]);
            var highNum = !isNaN(elem["highRange"]);
            var highLow = parseInt(elem["highRange"]) > parseInt(elem["lowRange"]);
            if (highLow && lowNum && highNum) {
              complete = complete && true;
            }
            else {
              complete = false;
            }
          }
          else {
            complete = false;
          }
          break;
        default:
          complete = false;
      case "normal-curve":
        complete = true;
      }
      int++;
    }
    return complete;
  }

  // input: newExpt, a boolean representing whether this expt is new
  outputCreate(newExpt) {
    var obj = {};
    var index = {};
    this.state.children
      .filter(item => this.state.deleted.indexOf(item.id) === -1)
      .map((item) => { 
        obj[item.id.toString()] = this.state.output[item.id.toString()];
        const exptItem = this.state.output[item.id.toString()];
        switch (exptItem["Type"]) {
          case "static-text":
            index[exptItem["static-text-key"]] = exptItem["Static Text"];
          case "normal-curve":
            index[exptItem["normal-curve-question-key"]] = exptItem["Question"];
            index[exptItem["normal-curve-question-key"] + "." + exptItem["normal-curve-legend-key1"]] = exptItem["graph1key"];
            index[exptItem["normal-curve-question-key"] + "." + exptItem["normal-curve-legend-key2"]] = exptItem["graph2key"];
          case "threshold":
            index[exptItem["threshold-key"]] = exptItem["Question"];
        }
      });
    // var validName = this.nameRef.current.value.length > 0;
    // if (!(0 in obj) || !this.checkOutput(obj) || !validName) {
    // if (!validName) {
    if (false) {
      alert("You have not filled out all fields, or have entered an invalid value!");
    }
    else {
      var finalObj = {};
      finalObj["exptName"] = this.nameRef.current.value;
      var int = 0;
      while (int < this.state.count) {
        if ((int.toString()) in obj) {
          finalObj["q" + int.toString()] = obj[int.toString()];
        }
        int++;
      }
      finalObj["count"] = int;
      delete index["undefined"];
      finalObj["index"] = index;

      console.log(finalObj);

      const username = this.props.auth.user.username;
      const studyName = this.props.match.params.studyName;

      if (!this.state.files.length == 0) {
        this.state.files.map(item => this.props.sendFile(username, item))
      };

      if (newExpt) {
        axios
        .put(
          'https://test-api-615.herokuapp.com/api/feedback/' + username +
          '/info/studyName-' + studyName + '/experiments',
          finalObj
        )
        .then(res => {
          console.log(res)
        })
        .then(function (response) {
          alert("Your experiment has been successfully created");
          window.location.reload(false);
        })
        .catch(function (error) {
          console.log(error);
        });
      } else {
        if (this.props.location.state != null) {
          const exptName = this.props.location.state.exptName;
          axios
          .delete('https://test-api-615.herokuapp.com/api/feedback/' + 
            username + '/info/studyName-' + studyName + '/experiments/exptName-' +
            exptName)
          .then(res => {
            axios
            .put(
              'https://test-api-615.herokuapp.com/api/feedback/' + username +
              '/info/studyName-' + studyName + '/experiments',
              finalObj
            )
            .then(res => {
              console.log(res)
            })
            .then(function (response) {
              alert("Your experiment has been successfully updated");
              window.location.reload(false);
            })
            .catch(function (error) {
              console.log(error);
            });
          });
        }
        
      }
    }
  }

  render() {
    const username = this.props.match.params.username;
    const studyName = this.props.match.params.studyName;
    const studyLink = "/" + username + "/" + studyName;

    var obj = {};
    this.state.children
      .filter(item => this.state.deleted.indexOf(item.id) === -1)
      .map((item) => { obj[item.id.toString()] = this.state.output[item.id.toString()] });
    var finalObj = {};
    // finalObj["exptName"] = this.nameRef.current.value;
    var int = 0;
    while (int < this.state.count) {
      if ((int.toString()) in obj) {
        finalObj["q" + int.toString()] = obj[int.toString()];
      }
      int++;
    }
    finalObj["count"] = int;
    return (
      <div ref={this.myRef}>
        <h2>Experiment Builder</h2>
        Back to <p> </p>
        <Link to={studyLink}>
          {studyName}
        </Link>
        <div>
          {/* <button onClick={() => console.log(this.state.children)}>see children</button> */}
          <form action="/submit" method="POST" className="unit">
            <p>Enter a name for this experiment </p>
            <input ref={this.nameRef}
              // value={this.state.exptName}
              // onChange={this.onChange}
              defaultValue={this.state.expt.exptName}
              type="text" id="userid" name="exptName" /><br />
            <b>all experiments in a study must have unique names</b>
          </form>
          {
            this.state.children
              .filter(item => this.state.deleted.indexOf(item.id) === -1)
              .map((item) => {
                return item.tab;
              })
          }
          <TabBuilder 
            build={this.builderFunction} 
            importQuestion={this.importQuestion}
            username={this.props.match.params.username}
            studyName={this.props.match.params.studyName} />
          <br/>
          {/* Add condition here. Submit / Update Experiment */}
          {
            this.props.location.state != null 
            ?
            <div>
              {
                this.props.location.state.newExpt
                ?
                <div className="extraPad">
                  <button onClick={() => this.outputCreate(true)} ref={this.submitRef} type="submit" value="Submit" className="btn">Submit</button>
                </div>
                :
                <div className="extraPad">
                  <button onClick={() => this.outputCreate(false)} ref={this.submitRef} type="submit" value="Submit" className="btn">Update Experiment</button>
                  <p style={{ opacity: 0 }}> place holder </p> 
                  <button className="btn" onClick={() => this.props.history.push(studyLink)}>
                    Cancel
                  </button>
                </div>
              }
            </div>
            :
            <div className="extraPad">
              <button onClick={() => this.outputCreate(true)} ref={this.submitRef} type="submit" value="Submit" className="btn">Submit</button>
            </div>
          }
        </div>
        <br/>
        {/* <button onClick={() => console.log(finalObj)}>Show finalObj</button><br/>
        <button onClick={() => console.log(this.state.files)}>Show files</button> */}
      </div>
    )
  }
}

TabList.propTypes = {
  auth: PropTypes.object.isRequired,
  dataFlowDBInfo: PropTypes.array.isRequired,
  sendFile: PropTypes.func.isRequired,
  dataFlowFileName: PropTypes.string.isRequired,
  getStudyInfo: PropTypes.func.isRequired,
  experiments: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  dataFlowDBInfo: state.dataFlow.dbInfo,
  dataFlowFileName: state.dataFlow.fileName,
  experiments: state.dataFlow.studyInfo
});

// export default TabList;
export default connect(
  mapStateToProps,
  { sendFile, getStudyInfo }
)(TabList);