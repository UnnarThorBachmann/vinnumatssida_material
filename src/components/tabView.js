import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';

import {connect} from 'react-redux';
import {storedData} from '../utils';
import {set} from '../actions'
class TabView extends Component {

  
  componentDidMount() {
    
    const gogn = storedData();
    //localStorage.clear();
    if (gogn) {
      
      this.props.dispatch(set(gogn));
    }
    
      
    
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

