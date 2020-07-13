###### Project Description

This is a React- Redux project. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

For a crash course with Redux, check out https://www.youtube.com/watch?v=93p3LxR9xfM&t=1528s

Below is a diagram that helps explain Redux:

![Alt text](/ReactRedux.jpg?raw=true "Redux Diagram")

Resources used for the project:
- MongoDB Atlas (referred to as "MongoDB" below)
- Heroku (hosts API)

## Components

# layout

**Displays home page, nav bar, etc ...**

# auth

**Handles login and register.**

Upon registration: 
- User's credentials will be sent to a database on MongoDB via API. Password is encoded with passport hwt (http://www.passportjs.org/packages/passport-jwt/). 
- A database on MongoDB is created for the user. The databse will contain a collection called "info". 

# dashboard 

**Displays user's studies and allows users to create new studies.**

When a study is created, a document containing the name of the study will be stored in the "info" collection of the user's database. 

The dashboard component will pull study names from the "info" collection via API. 

# Study 

**Displays experiments associated with a study and allows users to create and deploy experiments**

When a new experiment is created, the name of the experiment and its configurations will be appended into the document dedicated for the specific study. 

When experiments are deployed, new collections will be created under user's database. Each new collection is dedicated to a specific experiment for a specific study. These collections will save participants data. 

# SliderTab + TabBuilder + Tablist 

Current demo for creating a simple slider question. 


## Explanation for src/actions, src/reducers, src/store.js:

A form submission in the app will trigger an action. 

Reducers have functions that determine how state reacts to actions. 

Store holds the complete state tree of app. It sends state to React components that will react to states. 


## How to run this project on localhost:

Install npm and yarn on system.

```
git init
git clone -b master https://github.com/statistical-perceptions/survey-builder.git
npm install
yarn start
```




###############################################################

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
