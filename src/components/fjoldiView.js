import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


const fjoldatolur = [];
for (let i=1; i <=50; i++) {
  fjoldatolur.push(i);
}
export default class FjoldiView extends Component {
  state = {
    value: 25,
  };

  handleChangeFjoldi = (event, index, value) => {
    let i = this.props.index;
    this.props.changeFjoldi(i,value);
    console.log(i)
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({value: nextProps.fjoldi});
  }
  render() {
    return (
      
        
        <SelectField
          floatingLabelText="Hópastærð"
          floatingLabelStyle={{color: this.props.textalitur}}
          value={this.state.value}
          onChange={this.handleChangeFjoldi}
          maxHeight={200}
          underlineFocusStyle={{borderColor: this.props.focuslitur}}
          selectedMenuItemStyle={{color: this.props.focuslitur}}
        >
        {
          fjoldatolur.map((item)=> <MenuItem key={item} value={item} primaryText={item}/>)
        }
        </SelectField>
    );
  }
}