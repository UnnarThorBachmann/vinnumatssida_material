import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import Rusl from 'material-ui/svg-icons/action/delete';
import Skapa from 'material-ui/svg-icons/content/create';
import {connect} from 'react-redux';
import {storedData,storeData,getData} from '../utils';
import {set} from '../actions'


class TabView extends Component {
  componentDidMount() {
    //localStorage.clear();
    const gogn = storedData();
    if (gogn) 
      this.props.dispatch(set(JSON.parse(gogn)));
    
  }

  save = ()=>{
    storeData(this.props.storeState);
  }
  

  render() {
    return (
      <div>
        <AppBar
          title="Vinnumat"
          iconElementRight={
            <div>
              <IconButton 
                iconStyle={{color: this.props.iconColor}}
                onClick={this.save}
              >
                <Skapa/>
              </IconButton>
              <IconButton iconStyle={{color: this.props.iconColor}}>
                <Rusl/>
              </IconButton>
            </div>
          }
          showMenuIconButton={false}
        />
      </div>
    );
  }
}


const mapStateToProps = (state)=>({
  storeState: {...state}
});

export default connect(mapStateToProps)(TabView);

