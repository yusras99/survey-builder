import axios from "axios";
import {
  ADD_STUDY_NAME,
  GET_DB_INFO,
  GET_STUDY_INFO,
  GET_PART_DATA,
  GET_COL_NAMES,
  STORE_FILENAME,
  SEND_FILE
} from "./types";

export const addStudyName = (which_database, study_name) => dispatch => {
  const dataToPost = {
    studyName: study_name,
    experiments: []
  };
  // note that the goal of the following step is to show researchers 
  // the name of the study they have just created. This is totally doable
  // via a simple this.state written in Dashboard. However, putting it here
  // just makes things more organized and fits well with the rest of the 
  // redux structure I have used to create this demo
  axios
    .post('https://test-api-615.herokuapp.com/api/feedback/' + which_database + '/info',
      dataToPost)
    .then(entry => {
      // console.log(entry);
      dispatch({
        type: ADD_STUDY_NAME,
        payload: entry.data.studyName
      });
      alert("Study [" + study_name + "] is created.");
      window.location.reload(true);
    })
}

export const getDBInfo = (which_database) => dispatch => {
  axios
    .get('https://test-api-615.herokuapp.com/api/feedback/' + which_database + '/info')
    .then(res => {
      dispatch({
        type: GET_DB_INFO,
        payload: res.data
      })
    })
}

export const getStudyInfo = (which_database, which_study) => dispatch => {
  axios
    .get('https://test-api-615.herokuapp.com/api/feedback/' + which_database +
      '/info/studyName-' + which_study)
    .then(res => {
      dispatch({
        type: GET_STUDY_INFO,
        payload: res.data.experiments
      })
    })
}

export const createExptCol = (which_database, col_name, which_expt) => dispatch => {
  axios
    .post('https://test-api-615.herokuapp.com/api/' + which_database +
      "/createCol/" + col_name)
    .then(res => {
      // we can potentially improve the alert box
      alert("Experiment [" + which_expt + "] is deployed.");
      window.location.reload(true);
    })
}

export const getPartData = (which_database, col_name) => dispatch => {
  axios
    .get('https://test-api-615.herokuapp.com/api/feedback/' + which_database +
      "/" + col_name)
    .then(res => {
      dispatch({
        type: GET_PART_DATA,
        payload: res.data
      })
    })
}

export const getColNames = (which_database) => dispatch => {
  axios
    .get('https://test-api-615.herokuapp.com/api/' + which_database + "/collections")
    .then(res => {
      dispatch({
        type: GET_COL_NAMES,
        payload: res.data
      })
    })
}

export const storeFileName = (fileName) => dispatch => {
  dispatch({
    type: STORE_FILENAME,
    payload: fileName
  })
}

export const sendFile = (which_database, file) => dispatch => {
  axios
    .post('https://test-api-615.herokuapp.com/api/feedback/' + which_database + 
      "/itemData", file)
    .then(res => {
      console.log("Data sent to DB");
    })
}