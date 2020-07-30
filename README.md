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





---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
