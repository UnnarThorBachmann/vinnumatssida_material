import React, {Component} from 'react';
import TextField from 'material-ui/TextField';


export default class OnnurStorfView extends Component {
  state = {
    timar: '0',
     errorText: ''
  };

  handleChange = (event) => this.props.changeOnnurStorf(event.target.value); 

  componentWillReceiveProps(nextProps) {
    this.setState({timar: nextProps.timar,
      errorText: isNaN(nextProps.timar.replace(',','.')) || nextProps.timar.trim() === '' ? 'Verður að slá inn tölu':''
    });
  }

  render() {
    return (
      
        <TextField
              value={this.state.timar}
              floatingLabelText="Önnur störf en kennsla (klst)"
              floatingLabelStyle={{color: this.props.textalitur}}
              underlineFocusStyle={{borderColor: this.props.focuslitur}}
              onChange={this.handleChange}
              errorText={this.state.errorText}
            />
    );
  }
}