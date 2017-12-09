import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

class AndroidView extends Component {
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
    );
  }
}

export default AndroidView;

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};