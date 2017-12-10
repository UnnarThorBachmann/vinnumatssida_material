import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {grey900,deepOrangeA400} from 'material-ui/styles/colors';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

//import AndroidView from './components/androidView.js';
import TabView from './components/tabView.js';
import AboutTeacherView from './components/aboutTeacherView.js';

const muiTheme = getMuiTheme({
  palette: {
    textColor: grey900,
  },
  appBar: {
    height: 70,
    color: grey900,
    textColor: deepOrangeA400
  },
});

class App extends Component {
  /*
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

   handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };*/

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <TabView/>  
        <AboutTeacherView/>  
      </MuiThemeProvider>
    );
  }
}

export default App;

