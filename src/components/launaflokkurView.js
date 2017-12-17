import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const launaflokkar = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
export default class LaunaflokkurView extends Component {
  state = {
    launaflokkur: this.props.launaflokkur
  };

  handleChange= (event,index,value)=> {
    this.props.changeLaunaflokkur(value); 
  }

  componentWillReceiveProps(nextProps) {
    this.setState({launaflokkur: nextProps.launaflokkur,
    });
  }

  render() {
    return (
      
        <SelectField
          floatingLabelText="Launaflokkur"
          floatingLabelStyle={{color: this.props.textalitur}}
          value={this.state.launaflokkur}
          onChange={this.handleChange}
          maxHeight={200}
          underlineFocusStyle={{borderColor: this.props.focuslitur}}
          selectedMenuItemStyle={{color: this.props.focuslitur}}
        >
        {
          launaflokkar.map((item)=> <MenuItem key={item} value={item} primaryText={item}/>)
        }
        </SelectField>
    );
  }
}