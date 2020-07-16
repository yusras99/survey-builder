import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, BrowserRouter, HashRouter } from "react-router-dom";
import PrivateRoute from "./components/private-route/PrivateRoute";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import TabList from './components/TabList/TabList';
import NormalCurveResearch from './components/items/NormalCurveResearch';

import NavBar from './components/layout/NavBar';
import Landing from './components/layout/Landing';
import HomePage from './components/layout/HomePage';

import Register from './components/auth/Register';
import Login from './components/auth/Login'

import Dashboard from "./components/dashboard/Dashboard";
import ConfigStudy from './components/Study/ConfigStudy';
import ExptConfigs from './components/Study/ExptConfigs';
import PartData from './components/Study/PartData';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <HashRouter basename="/survey-builder/">
        <div className="App">
          < NavBar />
          <br/>
          < Landing />
          < Route exact path="/" component={HomePage} />
          < Route exact path="/register" component={Register} />
          < Route exact path="/login" component={Login} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/:expt/participantsData"
              component={PartData} />
            <PrivateRoute exact path="/:username/:studyName"
              component={ConfigStudy} />
            <PrivateRoute exact path="/:username/:studyName/exptBuilder"
              component={TabList} />
            <PrivateRoute exact path="/:username/:studyName/normalCurves"
              component={NormalCurveResearch} />
            <PrivateRoute exact path="/:username/:studyName/:exptName/configs"
              component={ExptConfigs}/>
            <PrivateRoute exact path="/:username/:studyName/:exptName/participantsData"
              component={PartData}/>
          </Switch>
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;
