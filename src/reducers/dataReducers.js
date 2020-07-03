import { GET_EXPT_NAMES } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_EXPT_NAMES: return action.payload;
        default: return state;
    }
}