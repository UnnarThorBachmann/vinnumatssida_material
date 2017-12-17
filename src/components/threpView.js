import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const threp = [];
for (let i = 0; i < 9; i++) {
  threp.push(i);
}
export default class ThrepView extends Component {
  state = {
    threp: this.props.threp
  };

  handleChange= (event,index,value)=> {
    this.props.changeThrep(value); 
  }

  componentWillReceiveProps(nextProps) {
    this.setState({threp: nextProps.threp,
    });
  }
  render() {
    return (
      
        <SelectField
          floatingLabelText="Þrep"
          floatingLabelStyle={{color: this.textalitur}}
          underlineFocusStyle={{borderColor: this.props.focuslitur}}
          value={this.state.threp}
          onChange={this.handleChange}
          maxHeight={200}
          selectedMenuItemStyle={{color: this.props.focuslitur}}
        >
        {
          threp.map((item)=> <MenuItem key={item} value={item} primaryText={item}/>)
        }
        </SelectField>
    );
  }
}