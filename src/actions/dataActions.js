import axios from "axios";
import { GET_EXPT_NAMES } from "./types";

export const fetchExptNames = (which_database) => dispatch => {
    axios
        .get("API_URL that points to cluster" + "/" + which_database + "/info")
        // debug and see if we need res.data at all or just res
        .then(res => dispatch({
                type: GET_EXPT_NAMES,
                payload: res.data
            })
        );
}

export const specificExptData = (which_database, which_col) => dispatch => {
    axios
        .get("API_URL that points to cluster" + "/" + which_database + "/" +
            which_col)
        .then(res => dispatch(res.data))
}