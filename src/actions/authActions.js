import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types";

/**
 * POST request to api to create a collection with user's login name
 * @param {[Object]} userData [json object contains username and password]
 * @param {[Object]} history [json object contains React history]
 */
export const registerUser = (userData, history) => dispatch => {
  axios
    // set up proxy in package.json later
    .post("https://test-api-615.herokuapp.com/api/register", userData)
    .then(res => history.push("/login")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

/**
 * POST request to api to grant jwtToken and login user
 * @param {[Object]} userData [json object contains username and password]
 */
export const loginUser = userData => dispatch => {
  axios
    // set up proxy in package.json later
    .post("https://test-api-615.herokuapp.com/api/login", userData)
    .then(res => {
      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

/**
 * Set logged in user
 * @param {[Boolean]} decoded [whether the user is logged in]
 */
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

/**
 * Load user
 */
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

/**
 * Logout user
 */
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};