import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};
const middleware = [thunk];

// ****** IMPORTANT ******
// uncomment the line including __REDUX_DEVTOOLS_EXTENSION__ when developing
// comment the line including __REDUX_DEVTOOLS_EXTENSION__ before 
// deploying to gh pages 
// (the line tells the browser to require devtools, but users don't have devtools)
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware)
    ,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;