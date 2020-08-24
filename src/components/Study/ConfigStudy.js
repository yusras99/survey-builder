import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { CopyToClipboard } from 'react-copy-to-clipboard';

import {
  getStudyInfo,
  createExptCol,
  getColNames,
  saveAddInfo
} from "../../actions/dataActions"

import axios from "axios";

class ConfigStudy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true
    };

    this.deployExpts = this.deployExpts.bind(this);
    this.changeState = this.changeState.bind(this);
    this.onDeploy = this.onDeploy.bind(this);
    this.onChecked = this.onChecked.bind(this);
  }
  // note: using params to get studyName is probably not good practice. 
  // figure out a better way to get info from previous page later, might
  // use cookies? or does react have some way to pass states between pages?
  componentDidMount() {
    const username = this.props.auth.user.username;
    const studyName = this.props.match.params.studyName;
    axios
      .get('https://test-api-615.herokuapp.com/api/feedback/' + username +
        '/info/studyName-' + studyName)
      .then(res => {
        const dataToPut = {
          "randomize": true
        }
        if (!Object.keys(res.data).includes("randomize")) {
          this.putRandomize(username, studyName, dataToPut);
        } else {
          this.setState({ checked: res.data.randomize });
        }
      });
    this.props.getStudyInfo(username, studyName);
    this.props.getColNames(username);
  }

  processColNames() {
    const studyName = this.props.match.params.studyName;
    const processedArr = this.props.colNames.filter(name => name !== "info");
    const currentStudyExpts = processedArr.filter(name =>
      name.split('-')[0] == studyName);
    const deployedExpts = currentStudyExpts.map(name => name.split('-')[1]);
    // this.setState({ deployExpts: deployedExpts });
    return deployedExpts;
  }

  putRandomize(database_name, study_name, data) {
    axios.put('https://test-api-615.herokuapp.com/api/feedback/' + 
      database_name + '/info/studyName-' + study_name, data);
  }

  onChecked() {
    const nowState = !this.state.checked;
    this.setState({ checked: !this.state.checked });
    const username = this.props.auth.user.username;
    const studyName = this.props.match.params.studyName;
    const dataToPut = {
      "randomize": nowState
    }
    this.putRandomize(username, studyName, dataToPut);
  }

  getExptNames() {
    const username = this.props.match.params.username;
    const studyName = this.props.match.params.studyName;

    const deployed = this.processColNames();
    // check if the experiments are deployed 
    return this.props.experiments.map(expt => {
      const exptName = expt.exptName;
      const surveyLink = expt.link;

      var condition;
      if (expt.condition == null) {
        condition = "N/A";
      } else {
        condition = expt.condition;
      }

      const exptDataLink = "/" + username + "/" + studyName + "/" +
        exptName + "/configs";
      // const partDataLink = "/" + username + "/" + studyName + "/" +
      //   exptName + "/participantsData";
      const partExptDataLink = "/" + username + "/" + studyName + "/" +
        exptName + "/participantsExptData";
      const exptPartLink = "https://statistical-perceptions.github.io/" + 
        "participant-app/#/participant-app/expt/" + username + 
          "/" + studyName + "-" + exptName
      const previewLink = "https://statistical-perceptions.github.io/" + 
      "participant-app/#/participant-app/preview/" + username + 
        "/" + studyName + "-" + exptName
      const dbLink = "https://test-api-615.herokuapp.com/api/feedback/" + 
        username + "/" + studyName + "-" + exptName

      if (deployed.includes(exptName)) {
        return (
          <div className="container">
            {
              this.state.checked 
              ? <div>
                You have chosen to randomize experiments in this study.
              </div>
              : <div>
                You have chosen not to randomize experiments in this study. 
              </div>
            }
            <br/>
            <div className="boxed">
              <b>{expt.exptName}</b> <br/>
              <a target="_blank" href={previewLink}>
                Preview Experiment
              </a> <br/><br/>
              <Link to={exptDataLink}>
                <button type="button">
                  Experiment Configs
                </button>
              </Link> <p> </p>
              <Link to={partExptDataLink}>
                <button type="button">
                  View Participants Data
                </button>
              </Link> <p> </p> 
              <br/><br/>
              Condition: <b>{condition}</b>

              {/* <br/>
              <button onClick={() => console.log(condition)}></button> */}

              <br/><br/>
              <b>Database Link:</b><br/>
              {dbLink} <br/>
              <CopyToClipboard text={dbLink}>
                <button 
                  onClick={() => 
                    alert("Database link has been copied to clipboard. " + 
                      "Paste it into your Qualtrics survey :)")}>
                  Copy experiment link to clipboard
                </button>
              </CopyToClipboard>
              <br/><br/>
              <b>Experiment Link:</b> <br/>
              {exptPartLink} <br/>
              <CopyToClipboard text={exptPartLink}>
                <button 
                  onClick={() => 
                    alert("Experiment link has been copied to clipboard. " + 
                      "Paste it into your Qualtrics survey :)")}>
                  Copy experiment link to clipboard
                </button>
              </CopyToClipboard>
              <br/><br/>
              <b>Qualtrics Demographics Survey Link:</b> <br/>
              {surveyLink} <br/>
              <CopyToClipboard text={surveyLink}>
                <button 
                  onClick={() => 
                    alert("Qualtrics Survey link has been copied to clipboard. " + 
                      "Paste it into your Qualtrics survey :)")}>
                  Copy experiment link to clipboard
                </button>
              </CopyToClipboard>
            </div>
          </div>
        )
      } else {
        return (
          <div>
            <input type="checkbox" onChange={this.onChecked} checked={this.state.checked}/>
            I want to randomize experiments in this study
            <br/><br/>
            <div className="boxed">
            Experiment: <b>{expt.exptName}</b><br/>
            <Link to={exptDataLink}>
              <button type="button">
                Configurations
              </button>
            </Link><br/><br/>
            <b>Experiment Link:</b><br/>
            {exptPartLink} <br/>
            <CopyToClipboard text={exptPartLink}>
              <button 
                onClick={() => 
                  alert("Experiment link has been copied to clipboard. " + 
                    "Paste it into your Qualtrics survey :)")}>
                Copy experiment link to clipboard
              </button>
            </CopyToClipboard>
            <br/><br/>
            <b>Database Link:</b><br/>
            {dbLink} <br/>
            <CopyToClipboard text={dbLink}>
              <button 
                onClick={() => 
                  alert("Database link has been copied to clipboard. " + 
                    "Paste it into your Qualtrics survey :)")}>
                Copy experiment link to clipboard
              </button>
            </CopyToClipboard>
            <br/><br/>
            <b>TODO</b> <br/>
            Paste the link to demographics qualtrics survey below: <br/>
            <textarea cols="60" rows="1" id={exptName + "link"}
              onInput={this.changeState} value={this.state.exptName}></textarea>
            <br/><br/>
            {
              this.state.checked
              ? <div>
                <b>TODO</b> <br/>
                Name the condition of this experiment: <br/>
                <textarea cols="60" rows="1" id={exptName + "condition"}
                  onInput={this.changeState} value={this.state.condition}></textarea>
                <br/>
              </div>
              : <div></div>
            }
            <br/>
            {/* <button onClick={() => console.log(this.state)}>Show State</button><br/> */}
            <button id={exptName} onClick={this.onDeploy}> 
              <b>DEPLOY</b>
            </button>
            <br/>
          </div>
          </div>
          
        )
      };
    })
  }

  changeState(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  onDeploy(e) {
    const username = this.props.match.params.username;
    const studyName = this.props.match.params.studyName;
    const exptName = e.currentTarget.id;

    const link = this.state[exptName + "link"];
    const condition = this.state[exptName + "condition"];

    // process condition first
    const conditionInfo = { "condition": condition };
    // this.props.saveAddInfo(username, studyName, exptName, "condition", conditionInfo);

    // NEED TO CLEAN THIS UP
    // i only used axios here for debugging
    axios
      .put('https://test-api-615.herokuapp.com/api/feedback/' + username + 
           '/info/studyName-' + studyName + '/experiments/exptName-' + exptName + '/' + 'condition',
           conditionInfo)
      .then(res => {
        console.log(res.data);
        var linkToSend;
        if (this.state.checked) {
          linkToSend = link + "?condition=" + condition
        } else {
          linkToSend = link;
        }
        const linkInfo = { "link": linkToSend };
        axios
          .put('https://test-api-615.herokuapp.com/api/feedback/' + username + 
               '/info/studyName-' + studyName + '/experiments/exptName-' + exptName + '/' + 'link',
               linkInfo)
          .then(res => {
            console.log(res.data);
            this.props.createExptCol(username, studyName + "-" + exptName, exptName);
          })
      })


    // const linkToSend = link + "?condition=" + condition
    // const linkInfo = { "link": linkToSend };
    // this.props.saveAddInfo(username, studyName, exptName, "link", linkInfo);
    // this.props.createExptCol(username, studyName + "-" + exptName, exptName);
  }

  // for now deployment simply creates a collection for each experiment 
  // that would later store participants data
  deployExpts() {
    const username = this.props.auth.user.username;
    const studyName = this.props.match.params.studyName;

    const deployed = this.processColNames();
    const exptNames = this.props.experiments.map(item => item.exptName);
    const difference = exptNames.filter(name => !deployed.includes(name));
    difference.forEach(expt_name => {
      this.props.createExptCol(username, studyName + "-" + expt_name, expt_name);
    });
  }

  deploy() {
    const deployed = this.processColNames();
    const exptNames = this.props.experiments.map(item => item.exptName);
    const difference = exptNames.filter(name => !deployed.includes(name));
    if (exptNames.length == 0) {
      return (
        <div className="container">
          <p style={{ color: "grey" }}>
            No experiments.
          </p>
        </div>
      )
    } else if (difference.length == 0) {
      return (
        <div className="container">
          <p style={{ color: "grey" }}>
            All experiments are deployed.
          </p>
        </div>
      )
    } 
  }

  // an action to fetch userData from APi for componentWillMount
  render() {
    const username = this.props.match.params.username;
    const studyName = this.props.match.params.studyName;
    const exptBuilderLink = "/" + username + "/" +
      studyName + "/exptBuilder";

    const deployed = this.processColNames();
    const exptNames = this.props.experiments.map(item => item.exptName);

    const partStudyDataLink = "/" + username + "/" + studyName + "/participantsStudyData";
    return (
      <div className="container">
        <h2>Study: {this.props.match.params.studyName}</h2>
        <Link to={exptBuilderLink}>
          <button>
            Build an Experiment
          </button>
        </Link>
        <br/><br/>
        <Link to={partStudyDataLink}>
          <button>
            View All Participant Data
          </button>
        </Link>
        <h3>
          Your Experiments
        </h3>
        {this.getExptNames()}
        <br /><br />
        {this.deploy()}
        <br />
        {/* <button onClick={() => console.log(this.props.experiments)}>show state</button> */}
      </div>
    )
  }
}

ConfigStudy.propTypes = {
  // Proptype.type, the type here must match initialState of reducer
  auth: PropTypes.object.isRequired,

  getStudyInfo: PropTypes.func.isRequired,
  experiments: PropTypes.array.isRequired,

  createExptCol: PropTypes.func.isRequired,

  getColNames: PropTypes.func.isRequired,
  colNames: PropTypes.array.isRequired,

  saveAddInfo: PropTypes.func.isRequired
};

// interaction between reducer and store (state), connect to props 
// for components to use
// props: state
const mapStateToProps = state => ({
  auth: state.auth,
  // experiments refer to the experiment configurations 
  // stored in collection [info] under the user's database
  experiments: state.dataFlow.studyInfo,
  colNames: state.dataFlow.colNames
});

export default connect(
  mapStateToProps,
  { getStudyInfo, createExptCol, getColNames, saveAddInfo }
)(ConfigStudy);