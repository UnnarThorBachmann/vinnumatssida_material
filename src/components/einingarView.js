import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

export default class EiningarView extends Component {
  state = {
    einingar: this.props.einingar,
    errorTextEiningar: ''
  };

  handleChangeEiningar = (event) => { 
    this.props.changeEiningar(event.target.value);
  };

  componentWillReceiveProps(nextProps) {
    this.setState({einingar: nextProps.einingar,
                  errorTextEiningar: (isNaN(nextProps.einingar.replace(',','.')) || nextProps.einingar.trim() === '')? 'Verður að hafa tölu': ''

    });
  }
  render() {
    return (
      
        
        <TextField
          value={this.state.einingar}
          floatingLabelText="Einingar"
          floatingLabelStyle={{color: this.props.textalitur}}
          underlineFocusStyle={{borderColor: this.props.focuslitur}}
          onChange={this.handleChangeEiningar}
          errorText={this.state.errorTextEiningar}
        />
    );
  }
}