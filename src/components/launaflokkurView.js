import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const launaflokkar = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
export default class LaunaflokkurView extends Component {
  state = {
    value: 1
  };

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      
        <SelectField
          floatingLabelText="Launaflokkur"
          floatingLabelStyle={{color: this.props.grey900}}
          value={this.state.value}
          onChange={this.handleChange}
          maxHeight={200}
          underlineFocusStyle={{borderColor: this.props.deepOrangeA400}}
        >
        {
          launaflokkar.map((item)=> <MenuItem key={item} value={item} primaryText={item}/>)
        }
        </SelectField>
    );
  }
}