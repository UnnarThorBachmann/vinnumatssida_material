import React, {Component} from 'react';
import Toggle from 'material-ui/Toggle';

export default class ToogleView extends Component {

  changeFulltStarf = (event,toggled)=> {
    
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
            toggled={fulltStarf}
          />
          <br/>
          <Toggle
            label="Reikna Laun"
            trackSwitchedStyle={{backgroundColor: focuslitur}}
            thumbSwitchedStyle={{backgroundColor: focuslitur}}
            onToggle={this.changeLaun}
            disabled={!fulltStarf}
            toggled={laun}
          />
        
          
        </div>
    );
  }
}

