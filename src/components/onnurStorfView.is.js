import React, {Component} from 'react';
import TextField from 'material-ui/TextField';


export default class OnnurStorfView extends Component {
  state = {
    timar: this.props.timar
  };

  handleChange = (event, index, value) => this.props.changeAldur(event.target.value); 

  componentWillReceiveProps(nextProps) {
    this.setState({value: nextProps.timar,
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