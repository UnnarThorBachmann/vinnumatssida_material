import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AgeView from './ageView.js';
import LaunaflokkurView from './launaflokkurView.js';
import ThrepView from './threpView.js';
import TextField from 'material-ui/TextField';
import {grey900,deepOrangeA400} from 'material-ui/styles/colors';


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
    value: 0
  };

  handleChange = (event, index, value) => {
    this.setState({value});
    console.log('prump');

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
        <br/>
        <LaunaflokkurView textalitur={grey900} focuslitur={deepOrangeA400}/>
        <br/>
        <ThrepView textalitur={grey900} focuslitur={deepOrangeA400}/>
        <br/>
      </div>
    );
  }
}

