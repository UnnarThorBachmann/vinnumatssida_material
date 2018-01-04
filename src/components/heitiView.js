import React, {Component} from 'react';
import TextField from 'material-ui/TextField';

export default class HeitiView extends Component {
  state = {
    heiti: this.props.heiti,
    errorTextHeiti: 'Hvað heitir áfanginn? Ekki nota (semí)kommu'
  };


  handleChange = (event) => {
    this.props.changeHeiti(event.target.value);    
  };
  componentWillReceiveProps(nextProps) {
    this.setState({heiti: nextProps.heiti,
      errorTextHeiti: (nextProps.heiti === '' || nextProps.heiti.indexOf(',') !== -1 || nextProps.heiti.indexOf(';') !== -1)? 'Hvað heitir áfanginn? Ekki nota (semí)kommu.': ''
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