import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import ContentInbox from 'material-ui/svg-icons/content/inbox';


const fjoldatolur = [];
for (let i=1; i <=50; i++) {
  fjoldatolur.push(i);
}


export default class FjoldiHlutfallView extends Component {
  state = {
    value: 1,
  };

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
       
       <List>
       <ListItem leftIcon={<ContentInbox />}>
        <SelectField
          floatingLabelText="Fjöldi í hópi"
          floatingLabelStyle={{color: this.props.textalitur}}
          value={this.state.value}
          onChange={this.handleChange}
          maxHeight={200}
          underlineFocusStyle={{borderColor: this.props.focuslitur}}
          selectedMenuItemStyle={{color: this.props.focuslitur}}
          style={{width: '100%'}}
        >
        {
          fjoldatolur.map((item)=> <MenuItem key={item} value={item} primaryText={item}/>)
        }
        </SelectField>
        </ListItem>
        </List>
       
    );
  }
}