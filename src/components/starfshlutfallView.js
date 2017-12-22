import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const starfshlutfall = [];
for (let i=30; i <= 100; i++) {
  starfshlutfall.push(i);
}
export default class StarfshlutfallView extends Component {
  state = {
    starfshlutfall: this.props.starfshlutfall
  };

  handleChange= (event,index,value)=> {
    this.props.changeStarfshlutfall(value); 
  }

  componentWillReceiveProps(nextProps) {
    this.setState({starfshlutfall: nextProps.starfshlutfall,
    });
  } 

  render() {

    return (
      
        <SelectField
          floatingLabelText="Starfshlutfall í samningi (%)"
          floatingLabelStyle={{color: this.props.textalitur}}
          value={this.state.starfshlutfall}
          onChange={this.handleChange}
          maxHeight={200}
          underlineFocusStyle={{borderColor: this.props.focuslitur}}
          selectedMenuItemStyle={{color: this.props.focuslitur}}
        >
        {
          starfshlutfall.map((item)=> <MenuItem key={item} value={item} primaryText={item}/>)
        }
        </SelectField>
    );
  }
}