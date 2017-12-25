import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

export default class SkiptitimarView extends Component {
  state = {
    skiptitimar: this.props.skiptitimar,
    errorTextSkiptitimar: ''
  };

  handleChangeSkiptitimar = (event) => { 
    
    this.props.changeSkiptitimar(event.target.value);
  };

  componentWillReceiveProps(nextProps) {
    this.setState({skiptitimar: nextProps.skiptitimar,
                  errorTextSkiptitimar: (isNaN(nextProps.skiptitimar.replace(',','.')) || nextProps.skiptitimar.trim() === '')? 'Verður að hafa tölu': ''

    });
  }
  render() {
    return (
        <TextField
          value={this.state.skiptitimar}
          floatingLabelText="Skiptitímar (mínútur á viku)"
          floatingLabelStyle={{color: this.props.textalitur}}
          underlineFocusStyle={{borderColor: this.props.focuslitur}}
          onChange={this.handleChangeSkiptitimar}
          errorText={this.state.errorTextSkiptitimar}
        />
    );
  }
}