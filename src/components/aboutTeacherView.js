import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AgeView from './ageView.js';
import LaunaflokkurView from './launaflokkurView.js';
import ThrepView from './threpView.js';
import TextField from 'material-ui/TextField';
import {grey900,deepOrangeA400} from 'material-ui/styles/colors';
import Toggle from 'material-ui/Toggle';



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
  state = {
    value: 0,
    toggled: false
  };

  handleChange = (event, index, value) => {
    this.setState({value});

  };

  handleToggle = (event, toggled) => {
    this.setState({toggled: toggled});
    console.log(this.state.toggled);
    console.log(toggled);
  };

  render() {
    return (
      <div style={styles.main}>
        <h3>Um kennarann</h3>
        <AgeView textalitur={grey900} focuslitur={deepOrangeA400}/>
        <br/>
        <TextField
            value={this.state.value}
            floatingLabelText="C-hluti (klst)"
            floatingLabelStyle={{color: grey900}}
            underlineFocusStyle={{borderColor: deepOrangeA400}}
            onChange={this.handleChange}

        />
        <div style={{width: '50%'}}>
        <Toggle
          label="Viltu launaútreikninga?"
          trackSwitchedStyle={{backgroundColor: deepOrangeA400}}
          thumbSwitchedStyle={{backgroundColor: deepOrangeA400}}
          onToggle={this.handleToggle}
        />
        </div>
        {this.state.toggled && 
        <div>
        <LaunaflokkurView textalitur={grey900} focuslitur={deepOrangeA400}/>
        <br/>
        <ThrepView textalitur={grey900} focuslitur={deepOrangeA400}/>
        <br/>
        </div>
        }
      </div>
    );
  }
}

