import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import TabList from './components/TabList/TabList';
import NavBar from './components/layout/NavBar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          {/* Route to TabList later */}
          {/* <TabList /> */}
          {/* <h1>Hello world</h1> */}
          <NavBar />
          < Route exact path="/register" component={Register} />
          < Route exact path="/login" component={Login} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
