# Project Description

This is a React- Redux project. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

For a crash course with Redux, check out https://www.youtube.com/watch?v=93p3LxR9xfM&t=1528s

Below is a diagram that helps explain Redux:

![Alt text](/ReactRedux.jpg?raw=true "Redux Diagram")

Resources used for the project:
- MongoDB Atlas (referred to as "MongoDB" below)
- Heroku (hosts API. API: https://github.com/statistical-perceptions/demoAPI-v2)

---

# Table of Contents

- [Components](#components)
- [Explanation for src/actions, src/reducers, src/store.js](#redux)
- [How to run this project on localhost](#localhost)
- [survey-builder Dev Tutorial ](#tutorial)

---

<a name="components"/>

# Components

Jump to: 

- [layout](#layout)
- [auth](#auth)
- [dashboard](#dashboard)
- [Study](#study)
- [TabBuilder + TabList](#tab)
- [items](#items)

<a name="layout"/>

## layout

**Displays home page, nav bar, etc ...**

<a name="auth"/>

## auth

**Handles login and register.**

Upon registration: 
- User's credentials will be sent to a database on MongoDB via API. Password is encoded with passport hwt (http://www.passportjs.org/packages/passport-jwt/). 
- A database on MongoDB is created for the user. The databse will contain a collection called "info". 

<a name="dashboard"/>

## dashboard 

**Displays user's studies and allows users to create new studies.**

When a study is created, a document containing the name of the study will be stored in the "info" collection of the user's database. 

The dashboard component will pull study names from the "info" collection via API. 

<a name="study"/>

## Study 

**Displays experiments associated with a study and allows users to create and deploy experiments**

When a new experiment is created, the name of the experiment and its configurations will be appended into the document dedicated for the specific study. 

When experiments are deployed, new collections will be created under user's database. Each new collection is dedicated to a specific experiment for a specific study. These collections will save participants data. 

<a name="tab"/>

## TabBuilder + TabList 

**An interface for psych researchers to build experiments**

TabBuilder returns a drop down list that gives researchers options to select their desired experiment type. 

TabList records experiment configuration data and sends it to database via API. 

<a name="items"/>

## items

**Contains experiment type components**

Developers can add more experiment types into this folder. 

---

<a name="redux"/>

# Explanation for src/actions, src/reducers, src/store.js:

A form submission in the app will trigger an action. 

Reducers have functions that determine how state reacts to actions. 

Store holds the complete state tree of app. It sends state to React components that will react to states. 

---

<a name="localhost"/>

# How to run this project on localhost

Install npm and yarn on system.

```
git init
git clone -b master https://github.com/statistical-perceptions/survey-builder.git
npm install
yarn start
```
---

<a name="tutorial"/>

# survey-builder Dev Tutorial 

This tutorial will walk you through the process to add your own experiment type to the app. Even though the tutorial covers some concepts of React and React-Redux, please read the Medium post below and the short YouTube video to get a better understanding of React and how Redux works with React. 

How React works: https://medium.com/leanjs/introduction-to-react-3000e9cbcd26#:~:text=What%20is%20React%3F,utilise%20it%20with%20other%20libraries

How Redux works: https://www.youtube.com/watch?v=nFryvdyMI8s&t=238s

## Create a new Experiment Type

Jump to:

- [Connect your Component to Redux](#redux)
- [How Component Constructor and Functions Interact](#interact)
- [Connect your Component to TabList.jsx](#expt)
- [Conclusion](#conclusion)

**Note**: you will need to create your own experiment type in both places: the survey-builder app and participant-app. There are some differences in how the two apps interact with your experiment type, but they should share the code that visually presents your item to researchers and participants. 

In this project folder, you need to create your own component that contains your experiment item and make changes in **src/components/TabList/TabList.jsx** to make sure the app is talking to your component. 

Navigate to **/src/components/items** and open **Template.js**. You can build on this template and create your own experiment item. Follow the ```TODO``` tags to add more code. This template implements a dropzone that allows researchers to drag and drop their item data. It also implements a dropdown menu that allows researchers to select previously uploaded files. Note that the actual files are note stored on the database; the file name and file content are stored as a key-value pair within a JSON object. 

This template serves as a reference. You can always add more functions / delete some existing functions depending on what you need. 

Below is a walk-through of how we created **NormalCurveResearcher.jsx**. Please navigate to **/src/components/items/NormalCurve** to see the file used for this walk-through. 

##### *TIP: How do React components work?*

Your Experiment Type will be written into a React component. A React app consists of many components, and these components can talk to each other using ```props``` which stands for properties. When a parent component talks to a child component, it can pass ```props``` to the child component, and the child component can use these ```props```. We will see how this works in code in the section [Connect your Component to Success.js]. 

---

<a name="redux"/>

### Connect your component to Redux

First, we need to import the following packages.
```sh
import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
```
We will use ```PropTypes``` to call functions in **/src/actions/dataActions.js**. We will ```connect``` our ```NormalCurveResearch``` component to the aforementioned functions and React props. 

Next, let's look at the function we have imported from ```dataActions.js```.
```sh
import { 
  getColData
} from '../../../actions/dataActions'
```
```getColData``` simply sends a GET request to our API to fetch all documents in a collection of a database. Specifically, we will be getting documents from a collection called **itemData** in a given user's database. The collection **itemData** contains all previously uploaded JSON files that are stored as JSON objects. Getting this data will populate the dropdown menu where researchers can select previously uploaded files. (**Limitation**: The dropdown menu will show file names, so when researchers upload a new dataset, they need to make sure that the file name is unique.)

In order to use this action and data associated with the action, Redux requires us to implement the following code with ```PropTypes``` and ```connect```. Take a look at the end of our **NormalCurveResearch.js** file. 

```sh
NormalCurveResearch.propTypes = {
  auth: PropTypes.object.isRequired,
  getColData: PropTypes.func.isRequired,
  dataFlowColData: PropTypes.array.isRequired
}
```
In the redux store, ```auth``` is an object that contains user login information, ```getColData``` is a function previously described, and ```dataFlowColData``` is an array associated with the array ```colData``` in the redux reducer (**/src/reducers/dataReducers.js**). Listing these required PropTypes items are not enough, we need to connect them to ```this.props``` so that we can directly use them in our NormalCurve component. 

```sh
const mapStateToProps = state => ({
  auth: state.auth,
  dataFlowColData: state.dataFlow.colData
});
```
In ```mapStateToProps```, we are saying that ```this.props.auth``` points to the ```auth``` object in the redux store, and ```this.props.dataFlowColData``` points to the ```colData``` array in the redux store. 

```sh
export default connect(
  mapStateToProps,
  { getColData }
)(NormalCurveResearch);
```
Finally, using ```connect```, we connect all this information with the redux store. Note that functions should be wrapped in curly brackets. 

Take a look at ```componentDidMount()```:
```sh
componentDidMount() {
  const username = this.props.auth.user.username;
  this.props.getColData(username, "itemData");
}
```
Here, we are using both the ```auth``` object and the ```getColData``` function. From the ```auth``` object, we get current user's username. Using the ```getColData``` function, we get all documents from the ```itemData``` collection under current user's database. These documents represent previously uploaded JSON files. Once the function is ran, these documents will be stored inside the ```colData``` array in the redux store. We will use ```this.props.dataFlowColData``` to access these documents. 

Inside ```handleSelectedFile()```, we have
```sh
const jsonData = this.props.dataFlowColData.filter(item => 
  item.fileName == this.state.fileChosen)[0].fileContent;
```
```jsonData``` represents the content of the file that a researcher has selected from the dropdown menu. 

Inside ```render()```, we have
```sh
const normalCurveFiles = this.props.dataFlowColData.filter(
  item => item.itemType == "normal-curve");
var fileNames = normalCurveFiles.map(item => item.fileName);
fileNames.unshift("Select File");
const renderOption = item => <option value={item}>{item}</option>
const fileOptions = fileNames.map(renderOption);
```
These few lines basically filters through the acquired documents and list their names for the drop down menu. 


---

<a name="interact"/>

### How Component Constructor and Functions Interact

When we want to access instances in our component, for example, the area under both normal curves, we need to create ```Ref```s. When users drag the two sliders, the area changes, and the most recent value is accessible throughout the component if we create a ```Ref``` for this area in the constructor. 

In the constructor, we would write:
```sh
this.areaRef = React.createRef();
```
When users drag on the triangular sliders, the function ```triDrag()``` is triggerd, and the area between two curves are calculated with ```curveArea```. The function then feed a numeric value into the ```current``` attribute of ```areaRef``` with:
```sh
curveArea(col) {
  if (this.state.col11 >= this.state.col22 || this.state.col12 <= this.state.col21) {
    this.areaRef.current.innerHTML = 0;
  }
  else {
    this.areaRef.current.innerHTML = this.state.overlapVals[Math.abs(this.state.col22 - this.state.col11)];
  }
}
```
When we want to show the value of ```areaRef``` to users we simply call ```this.areaRef``` as shown below:
```sh
<h4>Area Under Curve: <span ref={this.areaRef}></span></h4>
```

You will also notice a lot of bindings below the ```createRef```s. Details on this can be found at https://reactjs.org/docs/handling-events.html. 

Next, we have information stored in ```this.state```. Note that data stored in ```this.state``` is only accessible within the component where ```this.state``` lives unless you pass some data to a child component via ```props```. For instance, 
```sh
fileChosen: ''
```
indicates the file that a researcher has chosen from the drop down menu. The defult value is just an empty string. When users select a name from the drop down menu, the following lines are triggered. 
```sh
<select name="fileChosen" value={this.state.fileChosen} onChange={this.onChange}>
  {fileOptions}
</select>
```
While ```value``` points to the ```fileChosen``` string in ```this.state```, ```onChange``` actually changes ```this.state.fileChosen``` to the ```value``` that's been selected. 

---

<a name="expt"/>

### Connect your Component to TabList.jsx

Please navigate to **/src/components/item/Template.js** and read the comments above functions that will be passed from **TabList.jsx**. For instance, the functions that are passed into **NormalCurveResearcher** are found in the following few lines from **TabList.jsx**:
```sh
# inside builderFunction(tabDefine)
case "normal-curve": 
  arr.push({
    id: this.state.count,
    tab: <NormalCurveResearch getCount={this.getCount} 
            delete={this.delete} count={this.state.count} 
            handleChange={this.handleChange} 
            files={this.state.files} saveFile={this.saveFile}
            key={this.state.count.toString()}/> 
  })
  break;
```

---

<a name="conclusion"/>

### Conclusion
This is the end of the walk-through. If you get stuck somewhere, please use ```console.log``` to debug. If you have more questions about Redux, feel free to check out this YouTube video: [https://www.youtube.com/watch?v=93p3LxR9xfM&t=1534s].

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
