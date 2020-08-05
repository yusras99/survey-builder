import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {CopyToClipboard} from 'react-copy-to-clipboard';

import {
  getStudyInfo,
  createExptCol,
  getColNames,
  saveLink
} from "../../actions/dataActions"

class ConfigStudy extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.deployExpts = this.deployExpts.bind(this);
    this.recordLink = this.recordLink.bind(this);
    this.onDeploy = this.onDeploy.bind(this);
  }
  // note: using params to get studyName is probably not good practice. 
  // figure out a better way to get info from previous page later, might
  // use cookies? or does react have some way to pass states between pages?
  componentDidMount() {
    const username = this.props.auth.user.username;
    const studyName = this.props.match.params.studyName;
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

  getExptNames() {
    const username = this.props.match.params.username;
    const studyName = this.props.match.params.studyName;

    const deployed = this.processColNames();
    // check if the experiments are deployed 
    return this.props.experiments.map(expt => {
      const exptName = expt.exptName;
      const exptDataLink = "/" + username + "/" + studyName + "/" +
        exptName + "/configs";
      const partDataLink = "/" + username + "/" + studyName + "/" +
        exptName + "/participantsData";
      const partJSONDataLink = "/" + username + "/" + studyName + "/" +
        exptName + "/participantsJSONData";
      const exptPartLink = "https://statistical-perceptions.github.io/" + 
        "participant-app/#/participant-app/expt/" + username + 
          "/" + studyName + "-" + exptName
      const dbLink = "https://test-api-615.herokuapp.com/api/feedback/" + 
        username + "/" + studyName + "-" + exptName
      if (deployed.includes(exptName)) {
        return (
          <div className="container">
            <div className="boxed">
              <b>{expt.exptName}</b> <br/>
              <Link to={exptDataLink}>
                <button type="button">
                  Experiment Configs
                </button>
              </Link> <p> </p>
              <Link to={partJSONDataLink}>
                <button type="button">
                  View Participants Data
                </button>
              </Link> <p> </p> <br/><br/>
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
            </div>
          </div>
        )
      } else {
        return (
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
            <b>TODO</b>: Paste the link to demographics qualtrics survey below: <br/>
            <textarea cols="60" rows="1" id={exptName}
              onInput={this.recordLink} value={this.state.exptName}></textarea>
            <br/><br/>
            {/* <button onClick={() => console.log(this.state)}>Show State</button><br/> */}
            <button id={expt.exptName} onClick={this.onDeploy}> 
              <b>DEPLOY</b>
            </button>
          </div>
        )
      };
    })
  }

  recordLink(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  onDeploy(e) {
    const username = this.props.match.params.username;
    const studyName = this.props.match.params.studyName;
    const exptName = e.currentTarget.id;
    const link = this.state[exptName];

    const dataToPUT = { link : link };
    console.log(dataToPUT);
    this.props.saveLink(username, studyName, exptName, dataToPUT);
    this.props.createExptCol(username, studyName + "-" + exptName, exptName);
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
    // else {
    //   return (
    //     <div className="container">
    //       <button
    //         class="btn"
    //         onClick={this.deployExpts}>
    //         Deploy: <p></p>
    //           {difference.map(name => { return (<b>[{name}] </b>) })}
    //       </button>
    //     </div>
    //   )
    // }
  }

  // an action to fetch userData from APi for componentWillMount
  render() {
    const username = this.props.match.params.username;
    const studyName = this.props.match.params.studyName;
    const exptBuilderLink = "/" + username + "/" +
      studyName + "/exptBuilder";
    const normalCurvesLink = "/" + username + "/" +
      studyName + "/normalCurves";
    const buildExptLink = "/" + username + "/" + studyName + "/newExpt";

    const deployed = this.processColNames();
    const exptNames = this.props.experiments.map(item => item.exptName);
    const difference = exptNames.filter(name => !deployed.includes(name));
    return (
      <div className="container">
        <h2>Study: {this.props.match.params.studyName}</h2>
        <Link to={exptBuilderLink}>
          <button>
            Build an Experiment
          </button>
        </Link>
        <br/>
        <form>
          <h3>
            Your Experiments
          </h3>
          {this.getExptNames()}
          <br /><br />
          {this.deploy()}
          {/* <button onClick={() => console.log(this.state)}>
            Show State
          </button> */}
          <br />
        </form>
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

  saveLink: PropTypes.func.isRequired
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
  { getStudyInfo, createExptCol, getColNames, saveLink }
)(ConfigStudy);