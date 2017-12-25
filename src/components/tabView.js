import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';

import {connect} from 'react-redux';
import {storedData,storeData,deleteData} from '../utils';
import {set} from '../actions'




class TabView extends Component {
  componentDidMount() {
    //localStorage.clear();
    const gogn = storedData();
    if (gogn) 
      this.props.dispatch(set(JSON.parse(gogn)));
    
  }

  render() {
    return (
      <div>
        <AppBar
          title="Vinnumat"
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

