import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const kennsluvikur = [];
for (let i=0; i <=10; i++) {
  kennsluvikur.push(i);
}
export default class KennslustundirView extends Component {
  state = {
    value: 6,
  };

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      
        
        <SelectField
          floatingLabelText="Fjöldi kennslustunda á viku"
          floatingLabelStyle={{color: this.props.textalitur}}
          value={this.state.value}
          onChange={this.handleChange}
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