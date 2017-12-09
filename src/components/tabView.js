import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Kennarinn"/>
    <MenuItem primaryText="Bæta við áfanga"/>
    <MenuItem primaryText="Niðurstöður áfanga"/>
    <MenuItem primaryText="Niðurstöur kennara" />
  </IconMenu>
);

Logged.muiName = 'IconMenu';

class TabView extends Component {

  render() {
    return (
      <div>
        <AppBar
          title="Vinnumat"
          showMenuIconButton={false}
          iconElementRight={<Logged />}
        />
      </div>
    );
  }
}

export default TabView;