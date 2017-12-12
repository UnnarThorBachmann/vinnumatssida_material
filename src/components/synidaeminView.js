import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const synidaemi = ['Almenn braut',
            'Fagbóklegt',
            'Félagsgreinar',
            'Hægferð',
            'Íslenska',
            'Íþróttafræði',
            'Íþróttir',
            'Listgreinar',
            'Raungreinar',
            'Sjúkraliðanám',
            'Starfsbraut (1/3)',
            'Starfsbraut (4/6)',
            'Starfsbraut (7/12)',
            'Stærðfræði',
            'Tölvuáfangar',
            'Tungumál',
            'Verklegt'];
export default class SynidaeminView extends Component {
  state = {
    value: 'Stærðfræði'
  };

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      
        <SelectField
          floatingLabelText="Synidaemi"
          floatingLabelStyle={{color: this.props.textalitur}}
          value={this.state.value}
          onChange={this.handleChange}
          maxHeight={200}
          underlineFocusStyle={{borderColor: this.props.focuslitur}}
          selectedMenuItemStyle={{color: this.props.focuslitur}}
        >
        {
          synidaemi.map((item)=> <MenuItem key={item} value={item} primaryText={item}/>)
        }
        </SelectField>
    );
  }
}