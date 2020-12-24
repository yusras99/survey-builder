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

/**
 * Create, Edit, Manage experiments in a study
 */
class ConfigStudy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      deployed: Boolean
    };

    this.deployExpts = this.deployExpts.bind(this);
    this.changeState = this.changeState.bind(this);
    this.onDeploy = this.onDeploy.bind(this);
    this.onChecked = this.onChecked.bind(this);
    this.onDeleteExperiment = this.onDeleteExperiment.bind(this);
  }

  componentDidMount() {
    const username = this.props.auth.user.username;
    const studyName = this.props.match.params.studyName;
    // Get whether studies in this experiment are randomized. 
    // variable is stored in the file containing studyName
    axios
      .get('https://test-api-615.herokuapp.com/api/feedback/' + username +
        '/info/studyName-' + studyName)
      .then(res => {
        const dataToPut = {
          "randomize": true
        };
        console.log(res.data);
        // Deal with studies created by researchers before I implemented 
        // this randomize indicator
        if (!Object.keys(res.data).includes("randomize")) {
          this.putRandomize(username, studyName, dataToPut);
        } else {
          this.setState({ checked: res.data.randomize });
        };
      });
    this.props.getStudyInfo(username, studyName);
    this.props.getColNames(username);
    // if there are more than 1 experiment collections associated with the 
    // study, we mark the state of this experiment as { deployed : true }
    // once deployed, researchers cannot turn on/off randomization
    axios
      .get('https://test-api-615.herokuapp.com/api/' + username + "/collections")
      .then(res => {
        const thisSudyDeployedExpt = res.data.filter(name => 
          name.split("-")[0] == studyName);
        this.setState({ deployed: thisSudyDeployedExpt.length >= 1 });
      });
  }

  /**
   * Get names of collections that are already deployed
   */
  processColNames() {
    const studyName = this.props.match.params.studyName;
    // const processedArr = this.props.colNames.filter(name => name !== "info");
    // const currentStudyExpts = processedArr.filter(name =>
    //   name.split('-')[0] == studyName);
    const currentStudyExpts = this.props.colNames.filter(name =>
      name.split('-')[0] == studyName);
    const deployedExpts = currentStudyExpts.map(name => name.split('-')[1]);
    return deployedExpts;
  }

  /**
   * PUT request to update document w info
   * @param {[String]} database_name [name of database to query]
   * @param {[String]} study_name [study name to query]
   * @param {[Object]} data [a json object that will be added to the document
   *                         queried by study_name]
   */
  putRandomize(database_name, study_name, data) {
    axios.put('https://test-api-615.herokuapp.com/api/feedback/' + 
      database_name + '/info/studyName-' + study_name, data);
  }

  /**
   * Update document in database when users turn on/off randomization
   */
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

  /**
   * Return experiments in a study
   */
  getExpts() {
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
      const exptBuilderLink = "/" + username + "/" +
        studyName + "/exptBuilder";

      if (deployed.includes(exptName)) {
        return (
          <div className="container">
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
              <button id={expt.exptName} onClick={this.onDeleteExperiment}>
              Delete this Experiment
              </button>
              <br/><br/>
              Condition: <b>{condition}</b>
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
            <div className="boxed">
            Experiment: <b>{expt.exptName}</b><br/><br/>
            {/* <Link to={exptDataLink}>
              <button type="button">
                Configurations
              </button>
            </Link> <p> </p> */}
            {/* We are passing info to the link so that TabList.js knows */}
            {/* that we are in editing mode */}
            <Link to={{
                pathname: exptBuilderLink,
                state: {
                  newExpt: false,
                  exptName: exptName  
                }
              }}>
              <button type="button">
                Edit Experiment
              </button>
            </Link>
            {/* <br/><br/> */}
            <p> </p>
            <button id={expt.exptName} onClick={this.onDeleteExperiment}>
            Delete this Experiment
            </button>
            <br/><br/>
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

  /**
   * Delte both expt data stored in /info and expt collection that stores 
   * participant data
   * @param {[Event]} e [an event triggered by users to delete an expt]
   */
  onDeleteExperiment(e) {
    const username = this.props.match.params.username;
    const studyName = this.props.match.params.studyName;
    const exptName = e.target.id;
    var confirm = window.confirm("Are you sure you want to delete this" +
      " experiment [" + exptName + "] (and all its participant data)?");
    if (confirm) {
      // first delete expt config from /info
      axios
      .delete('https://test-api-615.herokuapp.com/api/feedback/' + 
        username + '/info/studyName-' + studyName + '/experiments/exptName-' +
        exptName)
      .then(res => {
        // then delete participant data collection
        axios
          .delete('https://test-api-615.herokuapp.com/api/feedback/' + 
            username + "/one", {data: {colName: studyName + "-" + exptName}})
          .then(res => {
            alert("You have successfully deleted [" + exptName + 
              "] and all its data!");
            window.location.reload(true);
          })
      });
    } else {
      alert("Deletion cancelled!");
      window.location.reload(true);
    }
  }

  /**
   * Modify expt data associated with studyName file stored in /info 
   * and create a new collectino to store participant data
   * @param {[Event]} e [an event triggered by user deploying an expt]
   */
  onDeploy(e) {
    const username = this.props.match.params.username;
    const studyName = this.props.match.params.studyName;

    var exptName;
    if (e.currentTarget != null) {
      exptName = e.currentTarget.id;
    } else {
      exptName = e;
    };
    console.log(exptName);

    const link = this.state[exptName + "link"];
    const condition = this.state[exptName + "condition"];

    // process condition first
    var conditionInfo;
    if (condition == null) {
      conditionInfo = { "condition": "N/A" };
    } else {
      conditionInfo = { "condition": condition };
    }
    // this.props.saveAddInfo(username, studyName, exptName, "condition", conditionInfo);

    // NEED TO CLEAN THIS UP 
    // i only used axios here for debugging
    // PUT requests to add condition and link data to a specific experiment in 
    // the "experiments array" associated with studyName
    axios
      .put('https://test-api-615.herokuapp.com/api/feedback/' + username + 
           '/info/studyName-' + studyName + '/experiments/exptName-' + exptName + '/' + 'condition',
           conditionInfo)
      .then(res => {
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
            // create a new collection in user's database
            this.props.createExptCol(username, studyName + "-" + exptName, exptName);
          })
      })
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

  /**
   * Footer to show different deployment buttons based on deployment status
   */
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
    } else if (difference.length >= 0) {
      return (
        <div className="container">
          <button style={{ padding: "12px 28px" }}
          onClick={() => difference.forEach(name => this.onDeploy(name))}>
            <b>Deploy All Experiments</b>
          </button>
          <br/>
          <br/>
        </div>
      )
    }
  }

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
        <Link to={{
          pathname: exptBuilderLink,
          state: {
              newExpt: true
            }
          }}>
          <button>
            Build an Experiment
          </button>
        </Link>
        <p> </p>
        <Link to={partStudyDataLink}>
          <button>
            View All Participant Data
          </button>
        </Link>
        <h3>
          Your Experiments
        </h3>
        {
          this.state.deployed
          ? <div></div>
          : <div>
              <input type="checkbox" onChange={this.onChecked} checked={this.state.checked}/>
                I want to randomize experiments in this study
              <br/>
          </div>
        }
        {
          this.state.checked 
          ? <div>
            You have chosen to randomize experiments in this study.
          </div>
          : <div>
            You have chosen not to randomize experiments in this study. 
            <br/>
          </div>
        }
        <br/>
        {this.getExpts()}
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