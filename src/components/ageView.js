import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


export default class AgeView extends Component {
  state = {
    value: 1
  };

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      
        <SelectField
          floatingLabelText="Aldur"
          value={this.state.value}
          onChange={this.handleChange}
        >
          <MenuItem value={1} primaryText="30 ára-" />
          <MenuItem value={2} primaryText="30-37 ára" />
          <MenuItem value={3} primaryText="38-54 ára" />
          <MenuItem value={4} primaryText="55-60 ára" />
          <MenuItem value={5} primaryText="60 ára+" />
          <MenuItem value={6} primaryText="60 ára+ (17 tímar)" />
        </SelectField>
    );
  }
}

