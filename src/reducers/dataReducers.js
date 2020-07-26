import {
  ADD_STUDY_NAME,
  GET_DB_INFO,
  GET_STUDY_INFO,
  GET_PART_DATA,
  GET_COL_NAMES,
  STORE_FILENAME
} from "../actions/types";

const initialState = {
  studyName: '',
  dbInfo: [],
  studyInfo: [],
  partData: [],
  colNames: [],
  // files: []
  fileName: ''
};

export default function (state = initialState, action) {
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
      };
    case GET_PART_DATA:
      return {
        ...state,
        partData: action.payload
      };
    case GET_COL_NAMES:
      return {
        ...state,
        colNames: action.payload
      };
    // case STORE_FILE:
    //   return {
    //     ...state,
    //     files: [...state.files, action.payload]
    //   };
    case STORE_FILENAME:
      return {
        ...state,
        fileName: action.payload
      }
    default:
      return state;
  }
}