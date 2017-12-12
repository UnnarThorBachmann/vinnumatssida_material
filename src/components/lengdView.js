import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const lengd = [];
for (let i=0; i <=100; i++) {
  lengd.push(i);
}
export default class LengdView extends Component {
  state = {
    value: 40,
  };

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      
        
        <SelectField
          floatingLabelText="Lengd kennslustunda í mín."
          floatingLabelStyle={{color: this.props.textalitur}}
          value={this.state.value}
          onChange={this.handleChange}
          maxHeight={200}
          underlineFocusStyle={{borderColor: this.props.focuslitur}}
          selectedMenuItemStyle={{color: this.props.focuslitur}}
        >
        {
          lengd.map((item)=> <MenuItem key={item} value={item} primaryText={item}/>)
        }
        </SelectField>
    );
  }
}