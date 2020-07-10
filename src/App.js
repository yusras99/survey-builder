import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, BrowserRouter } from "react-router-dom";
import PrivateRoute from "./components/private-route/PrivateRoute";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import TabList from './components/TabList/TabList';
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
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className="App">
          < NavBar />
          <br/>
          < Landing />
          < Route exact path={process.env.PUBLIC_URL + "/"} component={HomePage} />
          < Route exact path={process.env.PUBLIC_URL + "/register"} component={Register} />
          < Route exact path={process.env.PUBLIC_URL + "/login"} component={Login} />
          <Switch>
                <PrivateRoute exact path={process.env.PUBLIC_URL + "/dashboard"} component={Dashboard} />
                <PrivateRoute exact path={process.env.PUBLIC_URL + "/:expt/participantsData"} 
                    component={PartData} />
                <PrivateRoute exact path={process.env.PUBLIC_URL + "/:username/:studyName"}
                    component={ConfigStudy} />
                <PrivateRoute exact path={process.env.PUBLIC_URL + "/:username/:studyName/exptBuilder"} 
                    component={TabList} />
                <PrivateRoute exact path={process.env.PUBLIC_URL + "/:username/:studyName/:exptName/configs"} 
                    component={ExptConfigs}/>
                <PrivateRoute exact path={process.env.PUBLIC_URL + "/:username/:studyName/:exptName/participantsData"}
                    component={PartData}/>
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
