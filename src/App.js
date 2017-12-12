import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {grey900,deepOrangeA400} from 'material-ui/styles/colors';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TabView from './components/tabView.js';
import StepperProgress from './components/stepper.js';

const muiTheme = getMuiTheme({
  palette: {
    textColor: grey900,
  },
  appBar: {
    height: 70,
    color: grey900,
    textColor: deepOrangeA400
  },
  stepper: {
        iconColor: deepOrangeA400
    },
 
});

class App extends Component {

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <TabView/>  
        <StepperProgress iconColor={deepOrangeA400}/>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

