import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

export default class HeitiView extends Component {
  state = {
    heiti: this.props.heiti,
    errorTextHeiti: ''
  };


  handleChange = (event) => {
    event.preventDefault();
    this.setState({heiti: event.target.value,
      errorTextHeiti: event.target.value === '' ? 'Hvað heitir áfanginn?': ''
    });
    this.props.changeHeiti(event.target.value);    
  };


  render() {
    return (
      
        
        <TextField
          value={this.state.heiti}
          floatingLabelText="Heiti"
          floatingLabelStyle={{color: this.props.textalitur}}
          underlineFocusStyle={{borderColor: this.props.focuslitur}}
          onChange={this.handleChange}
          errorText={this.state.errorTextHeiti}
        />
    );
  }
}