import React, {Component} from 'react';
import TextField from 'material-ui/TextField';

export default class HeitiView extends Component {
  state = {
    heiti: this.props.heiti,
    errorTextHeiti: 'Hvað heitir áfanginn?'
  };


  handleChange = (event) => {
    this.props.changeHeiti(event.target.value);    
  };
  componentWillReceiveProps(nextProps) {
    this.setState({heiti: nextProps.heiti,
      errorTextHeiti: nextProps.heiti === '' ? 'Hvað heitir áfanginn?': ''
    });
  }

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