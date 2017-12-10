import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AgeView from './ageView.js';
import LaunaflokkurView from './launaflokkurView.js';
import ThrepView from './threpView.js';

const styles = {
  main: {
    marginLeft: '20%',
    marginRight: '20%',
    marginTop: '1%',
    borderStyle: 'solid',
    width: '40%',
    paddingLeft: '10%',
    paddingRight: '10%',
    paddingTop: '1%',
    paddingBottom: '1%',
    borderWidth: '1px',
    borderRadius: '10px'
  },
};


export default class AboutTeacherView extends Component {
  
  render() {
    return (
      <div style={styles.main}>
        <h3>Um kennarann</h3>
        <AgeView/>
        <br/>
        <LaunaflokkurView/>
        <br/>
        <ThrepView/>
        <br/>
      </div>
    );
  }
}

