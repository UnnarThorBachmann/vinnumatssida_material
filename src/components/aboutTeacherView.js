import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AgeView from './ageView.js';
import LaunaflokkurView from './launaflokkurView.js';
import ThrepView from './threpView.js';
import StarfshlutfallView from './starfshlutfallView.js';
import TextField from 'material-ui/TextField';
import {grey900,deepOrangeA400} from 'material-ui/styles/colors';
import Toggle from 'material-ui/Toggle';



const styles = {
  main: {
    marginLeft: '1%',
    marginRight: '1%',
    marginTop: '1%',
    borderStyle: 'solid',
    paddingLeft: '3%',
    paddingRight: '3%',
    paddingTop: '1%',
    paddingBottom: '1%',
    borderWidth: '1px',
    borderRadius: '10px',
    width: '25%'
  },
};


export default class AboutTeacherView extends Component {

    state = {
      value: 0,
      laun: false,
      starfshlutfall: false,
      errorText: ''
    }
  

  handleChange = (event) => {
    
    this.setState({value: event.target.value,
                  errorText: (isNaN(event.target.value.replace(',','.')) || event.target.value.trim() === '')? 'Verður að hafa tölu': ''

    });
    

  };

  handleStarfshlutfall = (event, toggled) => {
    this.setState({starfshlutfall: toggled});
    /*
    this.setState((state)=> {
      return {value: state.value,
              laun: toggled? (state.laun?true:false): false,
              starfshlutfall: toggled,
              errorText: state.errorText
      }
    })*/
  };

  handleLaun = (event, toggled) => {
    this.setState({laun: toggled});
    //this.handleStarfshlutfall(event,toggled);
  };

  render() {
    return (
      <div> 
        <div style={{display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'flex-start'}}
        >
          <div style={styles.main}>
            <h3>Reiknar vinnumat/laun á önn</h3>
              <p>Reiknar sjálkrafa út vinnumat í A-hluta. Veljið fullt vinnumat eða launaútreikninga eftir þörfum</p>
              <br/>
              <Toggle
                label="Fullt vinnumat (A + B + C)"
                trackSwitchedStyle={{backgroundColor: deepOrangeA400}}
                thumbSwitchedStyle={{backgroundColor: deepOrangeA400}}
                onToggle={this.handleStarfshlutfall}
              />
              <br/>
              <Toggle
                label="Reikna Laun"
                trackSwitchedStyle={{backgroundColor: deepOrangeA400}}
                thumbSwitchedStyle={{backgroundColor: deepOrangeA400}}
                onToggle={this.handleLaun}
                disabled={!this.state.starfshlutfall}
              />

          </div>
          {this.state.starfshlutfall &&
          <div style={styles.main}>
            <AgeView textalitur={grey900} focuslitur={deepOrangeA400}/>
            <br/>
            <TextField
              value={this.state.value}
              floatingLabelText="C-hluti (klst)"
              floatingLabelStyle={{color: grey900}}
              underlineFocusStyle={{borderColor: deepOrangeA400}}
              onChange={this.handleChange}
              errorText={this.state.errorText}
            />
            <br/>
            <StarfshlutfallView/>
          </div>
          }
          {(this.state.laun && this.state.starfshlutfall) &&
          <div style={styles.main}>
                <div> 
                <LaunaflokkurView textalitur={grey900} focuslitur={deepOrangeA400}/>
                <br/>
                <ThrepView textalitur={grey900} focuslitur={deepOrangeA400}/>
                <br/>
                </div>
          </div>
          }
        </div>
      </div>
    );
  }
}

