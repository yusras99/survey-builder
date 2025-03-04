import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

import { logoutUser } from "../../actions/authActions";

import {
  addStudyName,
  getDBInfo
} from "../../actions/dataActions";

import './Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studyName: ''
    }

    this.onChange = this.onChange.bind(this);
    this.onAddStudy = this.onAddStudy.bind(this);
    this.onDeleteStudy = this.onDeleteStudy.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  /**
   * load experiment names when the page loads
   */
  componentWillMount() {
    const username = this.props.auth.user.username;
    this.props.getDBInfo(username); // dbInfo will be in the store now
  }

  /**
   * Return names of studies created by user
   */
  getStudyNames() {
    const allInfo = this.props.dataFlowDBInfo;
    return allInfo.map(item => {
      const allKeys = Object.keys(item);
      if (allKeys.includes("studyName")) {
        const username = this.props.auth.user.username;
        const link = "/" + username + "/" + item.studyName;
        return (
          <div className="container">
            <p id={item.studyName}>
              {item.studyName} <p> </p> 
              <Link to={link}>
                View
              </Link> <p> </p>
              <button id={item.studyName} onClick={this.onDeleteStudy}>
                Delete
              </button>
            </p>
          </div>
        )
      }
    });
  }

  /**
   * Call addStudyName from redux actions
   */
  onAddStudy() {
    const username = this.props.auth.user.username;
    this.props.addStudyName(username, this.state.studyName);
  };

  /**
   * DELETE request to remove collection named [studyName] and all other 
   * collections associated with [studyName]
   * @param {[Event]} e [an event triggered by deleting a study]
   */
  onDeleteStudy(e) {
    const username = this.props.auth.user.username;
    const studyName = e.target.id;
    var confirm = window.confirm("Are you sure you want to delete this" + 
      " study [" + studyName + "] and all its experiment data?");
    if (confirm) {
      // delete the study doc in /info collection
      axios
        .delete('https://test-api-615.herokuapp.com/api/feedback/' + 
          username + '/info/studyName-' + studyName);
      // delete all deployed experiment collections in user's database
      axios
        .delete('https://test-api-615.herokuapp.com/api/feedback/' + 
          username + "/all", { data: { studyName: studyName }})
        .then(res => {
          alert("You have succesfully deleted [" + studyName + "] and all" + 
            " its experiment data!");
          window.location.reload(true);
        })
    } else {
      alert("Deletion cancelled!");
      window.location.reload(true);
    }
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const username = this.props.auth.user.username;
    return (
      <div className="container">
        <h2>Dashboard</h2>

        {/* Deprecated, used to direct researchers to configure normal curve items on google colab */}
        {/* <div className="boxed" style={{ width: "60%", margin: "auto" }}>
          <br/>
          <b>Configure Experiment Types:</b> <br/>
          <a href="https://colab.research.google.com/drive/1yleVQB_CrNJ5Z3v-YPatW2XqAD7yS8yp?usp=sharing" target="_blank">Normal Curves</a>
          <div><br/></div>
        </div> */}

        <h3>Add a Study</h3>
        Enter a name for your study: <br/>
        <input type="text" name="studyName"
          value={this.state.studyName} onChange={this.onChange} />
        <button onClick={this.onAddStudy}>Add Study</button>
        <br/>
        Please do <b>not</b> use "-" in the name

        <br/><br/>
        <div className="boxed" style={{ width: "60%", margin: "auto" }}>
          <br />
          {this.getStudyNames()}
          <br />
        </div>

        <br/><br/>
        <button
          onClick={this.onLogoutClick}
          className="btn">
          Logout
        </button>
        <div><br/><br/></div>
      </div>
    )
  };
};

Dashboard.propTypes = {
  // Proptype.type, the type here must match initialState of reducer
  logoutUser: PropTypes.func.isRequired,
  addStudyName: PropTypes.func.isRequired,
  getDBInfo: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  dataFlowDBInfo: PropTypes.array.isRequired
};

// interaction between reducer and store (state), connect to props 
// for components to use
const mapStateToProps = state => ({
  auth: state.auth,
  dataFlowDBInfo: state.dataFlow.dbInfo
});

export default connect(
  mapStateToProps,
  { logoutUser, addStudyName, getDBInfo }
)(Dashboard);