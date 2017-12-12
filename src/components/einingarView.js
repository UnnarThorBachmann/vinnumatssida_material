import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

export default class EiningarView extends Component {
  state = {
    einingar: 3,
    errorTextEiningar: ''
  };

  handleChangeEiningar = (event) => {
    
     this.setState({einingar: event.target.value,
                  errorTextEiningar: (isNaN(event.target.value.replace(',','.')) || event.target.value.trim() === '')? 'Verður að hafa tölu': ''

    });
  };
  render() {
    return (
      
        
        <TextField
          value={this.state.einingar}
          floatingLabelText="Einingar"
          floatingLabelStyle={{color: this.props.textalitur}}
          underlineFocusStyle={{borderColor: this.props.focuslitur}}
          onChange={this.handleChange}
          errorText={this.state.errorTextEiningar}
        />
    );
  }
}