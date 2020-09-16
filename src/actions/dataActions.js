import axios from "axios";
import {
  ADD_STUDY_NAME,
  GET_DB_INFO,
  GET_STUDY_INFO,
  GET_COL_DATA,
  GET_COLS_DATA,
  GET_COL_NAMES,
  STORE_FILENAME
} from "./types";

/**
 * POST request to add a document containing study_name 
 * @param {[String]} which_database [name of the database we are sending the document to]
 * @param {[String]} study_name [name of the study (user input)]
 */
export const addStudyName = (which_database, study_name) => dispatch => {
  const dataToPost = {
    studyName: study_name,
    experiments: []
  };
  // We are adding the document to /info collection
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

/**
 * Get all documents from the /info collection of which_database
 * @param {[String]} which_database [name of the database we want to query]
 */
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

/**
 * Get all experiments associated with which_study
 * @param {[String]} which_database [name of the database we want to query]
 * @param {[String]} which_study [name of the study we want to query]
 */
export const getStudyInfo = (which_database, which_study) => dispatch => {
  axios
    .get('https://test-api-615.herokuapp.com/api/feedback/' + which_database +
      '/info/studyName-' + which_study)
    .then(res => {
      dispatch({
        type: GET_STUDY_INFO,
        // note we are grabbing the experiments object from res.data
        payload: res.data.experiments
      });
    })
}

/**
 * PUT request to add additional information to a specific element of the 
 * experiments array in a stufy document
 * @param {[String]} which_database [name of the database we want to query]
 * @param {[String]} study_name [name of the study we want to query]
 * @param {[String]} expt_name [experiment name]
 * @param {[String]} infoType [either 'link' or 'condition']
 * @param {[Object]} info [a JSON object in the format {infoType: "some_data"}]
 */
export const saveAddInfo = (which_database, study_name, expt_name, infoType, info) => dispatch => {
  axios
    .put('https://test-api-615.herokuapp.com/api/feedback/' + which_database + 
      '/info/studyName-' + study_name + '/experiments/exptName-' + expt_name + '/' + infoType,
      info)
    .then(res => {
      // Note we don't need to save any data to Redux store
      console.log(res.data);
    })
} 

/**
 * POST request to create a collection to store participant data for which_expt
 * @param {[String]} which_database [database name]
 * @param {[String]} col_name [name of the collection to be created]
 * @param {[String]} which_expt [name of the experiment to be deployed]
 */
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

/**
 * Get participant data from col_name 
 * @param {[String]} which_database [name of the database we want to query]
 * @param {[String]} col_name [name of the collection we want to query]
 */
export const getColData = (which_database, col_name) => dispatch => {
  axios
    .get('https://test-api-615.herokuapp.com/api/feedback/' + which_database +
      "/" + col_name)
    .then(res => {
      // set collection data in redux store
      dispatch({
        type: GET_COL_DATA,
        payload: res.data
      })
    })
}

/**
 * Get participant data from col_name then append data to Redux store
 * ( Look at reducers to see the different between getColData and getColsData )
 * @param {[String]} which_database [database name]
 * @param {[String]} col_name [collection name]
 */
export const getColsData = (which_database, col_name) => dispatch => {
  axios
  .get('https://test-api-615.herokuapp.com/api/feedback/' + which_database +
    "/" + col_name)
  .then(res => {
    res.data.forEach(doc => {
      // append collection data to redux store
      dispatch({
        type: GET_COLS_DATA,
        payload: doc
      })
    })
  })
}

/**
 * Get all collection names from which_database
 * @param {[String]} which_database [database name]
 */
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

// forgot if this function is useful
// export const storeFileName = (fileName) => dispatch => {
//   dispatch({
//     type: STORE_FILENAME,
//     payload: fileName
//   })
// }

/**
 * DEPRECATED method: POST request to send user uploaded data to database
 * under the "itemData" collection
 * @param {[String]} which_database [database name]
 * @param {[Object]} file [a json object containing experiment item config data]
 */
export const sendFile = (which_database, file) => dispatch => {
  axios
    .post('https://test-api-615.herokuapp.com/api/feedback/' + which_database + 
      "/itemData", file)
    .then(res => {
      console.log("Data sent to DB");
    })
}