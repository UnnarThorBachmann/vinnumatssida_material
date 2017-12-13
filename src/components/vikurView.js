import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const kennsluvikur = [];
for (let i=0; i <=18; i++) {
  kennsluvikur.push(i);
}
export default class VikurView extends Component {
  state = {
    value: 15,
  };

  handleChangeKennsluvikur = (event, index, value) => {
    this.props.changeKennsluvikur(value);
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({value: nextProps.kennsluvikur});
  }

  render() {
    return (
      
        
        <SelectField
          floatingLabelText="Kennsluvikur"
          floatingLabelStyle={{color: this.props.textalitur}}
          value={this.state.value}
          onChange={this.handleChangeKennsluvikur}
          maxHeight={200}
          underlineFocusStyle={{borderColor: this.props.focuslitur}}
          selectedMenuItemStyle={{color: this.props.focuslitur}}
        >
        {
          kennsluvikur.map((item)=> <MenuItem key={item} value={item} primaryText={item}/>)
        }
        </SelectField>
    );
  }
}