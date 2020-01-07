This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Configured by following https://flaviocopes.com/react-electron/

# How to get started

## Step 1 - Install

`npm install`

## Step 2- Movie API

API for movie look-up provided by https://www.themoviedb.org/

In order to run the application, a .env file is needed at the root level with the API key that is provided by the provider.

The variable that will be used is REACT_APP_API_KEY_TMDB and the value must be set in the .env file.

Your env file should contain:

`BROWSER=none` which prevents the application from running in the browser and
`REACT_APP_API_KEY_TMDB={KEY}` which is where your key should go

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn dist`

Packages and deploys the application to a windows executable file that is run in electron
