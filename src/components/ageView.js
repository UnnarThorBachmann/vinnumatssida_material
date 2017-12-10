import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {grey900,deepOrangeA400} from 'material-ui/styles/colors';

const ages = ["30 ára-","30-37 ára","38-54 ára","55-60 ára","60 ára+","60 ára+ (17 tímar)"];

export default class AgeView extends Component {
  state = {
    value: "30 ára-"
  };

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      
        <SelectField
          floatingLabelText="Aldur"
          floatingLabelStyle={{color: grey900}}
          value={this.state.value}
          onChange={this.handleChange}
          underlineFocusStyle={{borderColor: this.props.deepOrangeA400}}

        >
        {
          ages.map((item)=> <MenuItem key={item} value={item} primaryText={item} />)
        }
    
        </SelectField>
    );
  }
}

