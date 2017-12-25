import React, {Component} from 'react';
import Toggle from 'material-ui/Toggle';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';


export default class ToogleView extends Component {

    
    
  

  changeFulltStarf = (event,toggled)=> {
    console.log(toggled);
    this.props.changeFulltStarf(toggled); 
  }

  changeLaun = (event,toggled)=> {
    this.props.changeLaun(toggled);
  
  }

  render() {
    const {focuslitur,fulltStarf,laun} = this.props;
    
    return (
        <div>
          <Toggle
            label="Fullt vinnumat"
            trackSwitchedStyle={{backgroundColor: focuslitur}}
            thumbSwitchedStyle={{backgroundColor: focuslitur}}
            onToggle={this.changeFulltStarf}
            //defaultToggled={fulltStarf}
            toggled={fulltStarf}
          />
          <br/>
          <Toggle
            label="Reikna Laun"
            trackSwitchedStyle={{backgroundColor: focuslitur}}
            thumbSwitchedStyle={{backgroundColor: focuslitur}}
            onToggle={this.changeLaun}
            disabled={!fulltStarf}
            //defaultToggled={laun}
            toggled={laun}
          />
        
          
        </div>
    );
  }
}

