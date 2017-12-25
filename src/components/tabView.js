import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import ContentRemove from 'material-ui/svg-icons/action/delete';



class TabView extends Component {

  render() {
    return (
      <div>
        <AppBar
          title="Vinnumat"
          iconElementRight={<IconButton><ContentRemove/></IconButton>}
          showMenuIconButton={false}
        />
      </div>
    );
  }
}

export default TabView;