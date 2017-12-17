import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AgeView from './ageView.js';
import LaunaflokkurView from './launaflokkurView.js';
import ThrepView from './threpView.js';
import StarfshlutfallView from './starfshlutfallView.js';
import OnnurStorfView from './onnurStorfView.js';

import TextField from 'material-ui/TextField';
import {grey900,deepOrangeA400} from 'material-ui/styles/colors';
import Toggle from 'material-ui/Toggle';
import {connect} from 'react-redux';
import {setLaunaflokkur} from '../actions'; 



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
  constructor(props) {
    super(props);

    this.state = {
      aldur: '30 ára-',
      timar: '0',
      starfshlutfall: 100,
      launaflokkur: 1,
      threp: 0,
      laun: false,
      fulltStarf: false,
    }
    this.changeOnnurStorf = this.changeOnnurStorf.bind(this);
    this.changeLaunaflokkur = this.changeLaunaflokkur.bind(this);
    this.changeThrep = this.changeThrep.bind(this);
    this.changeAldur = this.changeAldur.bind(this);
    this.changeStarfshlutfall = this.changeStarfshlutfall.bind(this);
    this.changeFulltStarf = this.changeFulltStarf.bind(this);
    this.changeLaun = this.changeLaun.bind(this);


  }

  changeOnnurStorf(timar) {
    console.log(timar);
    this.setState({timar: timar})
  }

  changeAldur(aldur) {
    console.log(aldur);
    this.setState({aldur: aldur})
  }

  changeLaunaflokkur(launaflokkur) {
    this.setState({launaflokkur: launaflokkur})
  }

  changeThrep(threp) {
    this.setState({threp: threp})
  }

 changeStarfshlutfall(starfshlutfall) {
    this.setState({starfshlutfall: starfshlutfall})
  }

  changeFulltStarf(event, toggled) {
    this.setState({fulltStarf: toggled});
  
  };

  changeLaun (event, toggled) {
    this.setState({laun: toggled});
  };

  render() {
    return (
      <div> 
        <div style={{display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'flex-start'}}
        >
          <div style={styles.main}>
            <h3>Reikna vinnumat</h3>
              <p>Hægt að nota til að reikna vinnumat stakra áfanga. Veljið fullt vinnumat eða launaútreikninga eftir þörfum</p>
              <br/>
              <Toggle
                label="Fullt vinnumat"
                trackSwitchedStyle={{backgroundColor: deepOrangeA400}}
                thumbSwitchedStyle={{backgroundColor: deepOrangeA400}}
                onToggle={this.changeFulltStarf}
              />
              <br/>
              <Toggle
                label="Reikna Laun"
                trackSwitchedStyle={{backgroundColor: deepOrangeA400}}
                thumbSwitchedStyle={{backgroundColor: deepOrangeA400}}
                onToggle={this.changeLaun}
                disabled={!this.state.fulltStarf}
              />

          </div>
          {this.state.fulltStarf &&
          <div style={styles.main}>
            <AgeView textalitur={grey900} 
                      focuslitur={deepOrangeA400} 
                      aldur={this.state.aldur} 
                      changeAldur = {this.changeAldur}
            />
            <br/>
            <OnnurStorfView 
              textalitur={grey900} 
              focuslitur={deepOrangeA400} 
              timar={this.state.timar} 
              changeOnnurStorf={this.changeOnnurStorf}
            />
            <br/>
            <StarfshlutfallView 
              textalitur={grey900} 
              focuslitur={deepOrangeA400} 
              starfshlutfall={this.state.starfshlutfall} 
              changeStarfshlutfall={this.changeStarfshlutfall}
            />
          </div>
          }
          {(this.state.laun && this.state.fulltStarf) &&
          <div style={styles.main}>
                <div> 
                <LaunaflokkurView 
                  textalitur={grey900} 
                  focuslitur={deepOrangeA400}
                  launaflokkur= {this.state.launaflokkur} 
                  changeLaunaflokkur={this.changeLaunaflokkur}
                />
                <br/>
                <ThrepView 
                  textalitur={grey900} 
                  focuslitur={deepOrangeA400}
                  threp= {this.state.threp} 
                  changeThrep={this.changeThrep}
                />
                <br/>
                </div>
          </div>
          }
        </div>
      </div>
    );
  }
}

