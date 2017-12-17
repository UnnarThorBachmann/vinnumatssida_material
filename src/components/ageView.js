import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {grey900,deepOrangeA400} from 'material-ui/styles/colors';

const ages = ["30 ára-","30-37 ára","38-54 ára","55-60 ára","60 ára+","60 ára+ (17 tímar)"];

export default class AgeView extends Component {

    state ={
      aldur: this.props.aldur
    };
    
  

  handleChange= (event,index,value)=> {
    this.props.changeAldur(value); 
  }

  componentWillReceiveProps(nextProps) {
    this.setState({aldur: nextProps.aldur,
    });
  }

  render() {
    return (
      
        <SelectField
          floatingLabelText="Aldur"
          floatingLabelStyle={{color: this.props.textalitur}}
          value={this.state.aldur}
          onChange={this.handleChange}
          underlineFocusStyle={{borderColor: this.props.focuslitur}}
          selectedMenuItemStyle={{color: this.props.focuslitur}}
        >
        {
          ages.map((item)=> <MenuItem key={item} value={item} primaryText={item} />)
        }
    
        </SelectField>
    );
  }
}

