import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

class App extends Component {
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
  };

  render() {
    return (
      <MuiThemeProvider>
        <div>
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
        >
          <Tab label="Um kennarann" value={0} />
          <Tab label="Bæta við áfanga" value={1} />
          <Tab label="Niðurstöður áfanga" value={2} />
          <Tab label="Niðurstöður kennara" value={2} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div>
            <h2 style={styles.headline}>Tabs with slide effect</h2>
            Kennarinn
          </div>
          <div style={styles.slide}>
            Bæta við áfanga 
          </div>
          <div style={styles.slide}>
            Niðurstöður áfanga
          </div>
          <div style={styles.slide}>
            Niðurstöður kennara
          </div>
        </SwipeableViews>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
};