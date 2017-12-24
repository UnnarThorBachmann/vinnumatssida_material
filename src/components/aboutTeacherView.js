import React, {Component} from 'react';
import Media from 'react-media';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AgeView from './ageView.js';
import LaunaflokkurView from './launaflokkurView.js';
import ThrepView from './threpView.js';
import StarfshlutfallView from './starfshlutfallView.js';
import OnnurStorfView from './onnurStorfView.js';
import {setLaunaflokkur,setThrep,setVinnuskylda,setStarfshlutfall,setOnnurStorf,fulltStarf,laun} from '../actions'; 

import TextField from 'material-ui/TextField';
import {grey900,deepOrangeA400} from 'material-ui/styles/colors';
import Toggle from 'material-ui/Toggle';
import {connect} from 'react-redux';



const styles = {
  main: {
    className: 'gluggar',
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
    width: '25%',
  }
};


class AboutTeacherView extends Component {
  constructor(props) {
    super(props);

    this.changeOnnurStorf = this.changeOnnurStorf.bind(this);
    this.changeLaunaflokkur = this.changeLaunaflokkur.bind(this);
    this.changeThrep = this.changeThrep.bind(this);
    this.changeAldur = this.changeAldur.bind(this);
    this.changeStarfshlutfall = this.changeStarfshlutfall.bind(this);
    this.changeFulltStarf = this.changeFulltStarf.bind(this);
    this.changeLaun = this.changeLaun.bind(this);


  }

  changeOnnurStorf(timar) {
    const {dispatch} = this.props;
    const valid = (isNaN(timar.replace(',','.')) || timar.trim() === '')? true:false
    
    this.props.invalid(!valid);
    dispatch(setOnnurStorf(timar));

  }

  changeAldur(aldur) {
    const {dispatch} = this.props;
    dispatch(setVinnuskylda(aldur));
    
  }

  changeLaunaflokkur(launaflokkur) {
    const {dispatch} = this.props;
    dispatch(setLaunaflokkur(launaflokkur));
  }

  changeThrep(threp) {
    const {dispatch} = this.props;
    dispatch(setThrep(threp));
  }

 changeStarfshlutfall(starfshlutfall) {
    const {dispatch} = this.props;
    dispatch(setStarfshlutfall(starfshlutfall));
  }

  changeFulltStarf(event, toggled) {
    const {dispatch} = this.props;
    dispatch(fulltStarf(toggled));
  
  };

  changeLaun (event, toggled) {
    const {dispatch} = this.props;
    dispatch(laun(toggled));
  };

  render() {
    const {launaflokkur, threp, timar, aldur, starfshlutfall,fulltStarf,laun} = this.props;
    
    return (
      <div>
        
        <div style={{display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'flex-start'}}
        >
          <div style={{...styles.main,...this.props.mobilestyle}}>
            <h3>Reikna vinnumat</h3>
              <p>Hægt að nota til að reikna vinnumat stakra áfanga. Veljið fullt vinnumat eða launaútreikninga eftir þörfum</p>
              <br/>
              <Toggle
                label="Fullt vinnumat"
                trackSwitchedStyle={{backgroundColor: deepOrangeA400}}
                thumbSwitchedStyle={{backgroundColor: deepOrangeA400}}
                onToggle={this.changeFulltStarf}
                defaultToggled={this.props.fulltStarf}
              />
              <br/>
              <Toggle
                label="Reikna Laun"
                trackSwitchedStyle={{backgroundColor: deepOrangeA400}}
                thumbSwitchedStyle={{backgroundColor: deepOrangeA400}}
                onToggle={this.changeLaun}
                disabled={!fulltStarf}
                defaultToggled={this.props.laun}
              />

          </div>
          {fulltStarf &&
          <div style={{...styles.main,...this.props.mobilestyle}}>
            <AgeView textalitur={grey900} 
                      focuslitur={deepOrangeA400} 
                      aldur={aldur} 
                      changeAldur = {this.changeAldur}
            />
            <br/>
            <OnnurStorfView 
              textalitur={grey900} 
              focuslitur={deepOrangeA400} 
              timar={timar} 
              changeOnnurStorf={this.changeOnnurStorf}
            />
            <br/>
            <StarfshlutfallView 
              textalitur={grey900} 
              focuslitur={deepOrangeA400} 
              starfshlutfall={starfshlutfall} 
              changeStarfshlutfall={this.changeStarfshlutfall}
            />
          </div>
          }
          {(laun && fulltStarf) &&
          <div style={{...styles.main,...this.props.mobilestyle}}>
                <div> 
                <LaunaflokkurView 
                  textalitur={grey900} 
                  focuslitur={deepOrangeA400}
                  launaflokkur= {launaflokkur} 
                  changeLaunaflokkur={this.changeLaunaflokkur}
                />
                <br/>
                <ThrepView 
                  textalitur={grey900} 
                  focuslitur={deepOrangeA400}
                  threp= {threp} 
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

const mapStateToProps = (state)=> ({
    launaflokkur: state.launaflokkur,
    threp: state.threp,
    timar: state.timar,
    aldur: state.aldur,
    starfshlutfall: state.starfshlutfall,
    fulltStarf: state.fulltStarf,
    laun: state.laun
});

export default connect(mapStateToProps)(AboutTeacherView)