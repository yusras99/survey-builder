import { 
    ADD_STUDY_NAME,
    GET_DB_INFO,
    GET_STUDY_INFO
} from "../actions/types";

const initialState = {
    studyName: '',
    dbInfo: [],
    studyInfo: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_STUDY_NAME:
            return {
                ...state,
                studyName: action.payload
            };
        case GET_DB_INFO:
            return {
                ...state,
                dbInfo: action.payload
            };
        case GET_STUDY_INFO:
            return {
                ...state,
                studyInfo: action.payload
            }
        default: 
            return state;
    }
}