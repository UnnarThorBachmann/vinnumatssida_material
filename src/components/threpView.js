import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const threp = [];
for (let i = 0; i < 9; i++) {
  threp.push(i);
}
export default class ThrepView extends Component {
  state = {
    value: 0
  };

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      
        <SelectField
          floatingLabelText="Þrep"
          floatingLabelStyle={{color: this.props.grey900}}
          underlineFocusStyle={{borderColor: this.props.deepOrangeA400}}
          value={this.state.value}
          onChange={this.handleChange}
          maxHeight={200}
        >
        {
          threp.map((item)=> <MenuItem key={item} value={item} primaryText={item}/>)
        }
        </SelectField>
    );
  }
}