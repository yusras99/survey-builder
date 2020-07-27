import React, { Component } from 'react';
import './TabList.css';
import '../TabBuilder/TabBuilder'
import TabBuilder from '../TabBuilder/TabBuilder';
import SliderTab from '../SliderTab/SliderTab';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import NormalCurveResearch from '../items/NormalCurveResearch.jsx';

import { sendFile } from '../../actions/dataActions'

const axios = require('axios');

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
      files: []
    }
    this.myRef = React.createRef();
    this.submitRef = React.createRef();
    this.nameRef = React.createRef();

    this.builderFunction = this.builderFunction.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.delete = this.delete.bind(this);
    this.getCount = this.getCount.bind(this);
    this.outputCreate = this.outputCreate.bind(this);
    this.checkOutput = this.checkOutput.bind(this);

    this.saveFile = this.saveFile.bind(this);

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  // Developers need to add more cases here
  builderFunction = (tabDefine) => {
    var arr = this.state.children;

    switch (tabDefine) {
      case "slider":
        arr.push({ 
          id: this.state.count, 
          tab: <SliderTab getCount={this.getCount} 
                  delete={this.delete} count={this.state.count} 
                  handleChange={this.handleChange} 
                  key={this.state.count.toString()} /> 
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
      default:
        arr = <div>Unknown Element</div>
    }

    var curOutput = this.state.output;
    curOutput[this.state.count.toString()] = { "Type": tabDefine };
    // curOutput[this.state.count.toString()] = { "fileName": this.state.currentFileName };
    var newCount = this.state.count + 1;
    this.setState({ children: arr, count: newCount, output: curOutput, complete: false });
  }

  handleChange(pos, newVal, count) {
    var curOutput = this.state.output;
    curOutput[count.toString()][pos] = newVal;
    this.setState({ output: curOutput });
  }

  delete(id) {
    var newDelete = this.state.deleted;
    newDelete.push(id);
    this.setState({ deleted: newDelete });
  }

  getCount(count) {
    return count;
  }

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

  outputCreate() {
    var obj = {};
    this.state.children
      .filter(item => this.state.deleted.indexOf(item.id) === -1)
      .map((item) => { obj[item.id.toString()] = this.state.output[item.id.toString()] });
    var validName = this.nameRef.current.value.length > 0;
    if (!(0 in obj) || !this.checkOutput(obj) || !validName) {
      alert("You have not filled out all fields, or have entered an invalid value!");
    }
    else {
      var finalObj = { userID: new Date().toString() };
      finalObj["exptName"] = this.nameRef.current.value;
      var int = 0;
      while (int < this.state.count) {
        if ((int.toString()) in obj) {
          finalObj["q" + int.toString()] = obj[int.toString()];
        }
        int++;
      }
      finalObj["count"] = int;

      const username = this.props.auth.user.username;
      const expt_name = this.state.exptName;
      const studyName = this.props.match.params.studyName;

      console.log(finalObj);
      if (!this.state.files.length == 0) {
        this.state.files.map(item => this.props.sendFile(username, item))
      };

      axios.put(
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

    }
  }

  render() {
    const username = this.props.match.params.username;
    const studyName = this.props.match.params.studyName;
    const studyLink = "/" + username + "/" + studyName;
    return (
      <div className="list" ref={this.myRef}>
        Back to <p> </p>
        <Link to={studyLink}>
          {studyName}
        </Link>
        <form action="/submit" method="POST" className="unit">
          <p>Enter a name for this experiment </p>
          <input ref={this.nameRef}
            value={this.state.exptName}
            onChange={this.onChange}
            type="text" id="userid" name="exptName" /><br /><br />
        </form>
        {
          this.state.children
            .filter(item => this.state.deleted.indexOf(item.id) === -1)
            .map((item) => {
              return item.tab;
            })
        }
        <TabBuilder build={this.builderFunction} />
        <div className="extraPad">
          <button onClick={this.outputCreate} ref={this.submitRef} type="submit" value="Submit" className="btn">Submit</button>
        </div>
      </div>
    )
  }
}

TabList.propTypes = {
  auth: PropTypes.object.isRequired,
  dataFlowDBInfo: PropTypes.array.isRequired,
  sendFile: PropTypes.func.isRequired,
  dataFlowFileName: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  dataFlowDBInfo: state.dataFlow.dbInfo,
  dataFlowFileName: state.dataFlow.fileName
});

// export default TabList;
export default connect(
  mapStateToProps,
  { sendFile }
)(TabList);