import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

export const fetchSurveyNames = (which_database) => dispatch => {
    axios
        .get("API_URL that points to cluster" + "/" + which_database + "/info")
        // debug and see if we need res.data at all or just res
        .then(res => dispatch(res.data))
}

export const specificSurveyData = (which_database, which_col) => dispatch => {
    axios
        .get("API_URL that points to cluster" + "/" + which_database + "/" +
            which_col)
        .then(res => dispatch(res.data))
}