import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AgeView from './ageView.js';
import LaunaflokkurView from './launaflokkurView.js';
import ThrepView from './threpView.js';
import StarfshlutfallView from './starfshlutfallView.js';
import SynidaeminView from './synidaeminView.js';
import HeitiView from './heitiView.js';
import EiningarView from './einingarView.js';
import VikurView from './vikurView.js';
import LengdView from './lengdView.js';
import KennslustundirView from './kennslustundirView.js';
import FjoldiView from './fjoldiView.js';
import SkiptitimarView from './skiptitimarView.js';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import Badge from 'material-ui/Badge';
import {connect} from 'react-redux';
import {addAfangi} from '../actions'; 


import {grey900,deepOrangeA400} from 'material-ui/styles/colors';



const styles = {
  thumb: {
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


class CourseFormView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      heiti: '',
      einingar: '3',
      synidaemi: 'Stærðfræði',
      kennsluvikur: 15,
      kennslustundir: 6,
      lengdKst: 40,
      hopar: [{fjoldi: 25}],
      heitiNotEmpty: false,
      einingarIsNumber: true,
      skiptitimarIsNumber: true,
      skiptitimar: '0',
      disabled: true

    }

    this.changeHeiti = this.changeHeiti.bind(this);
    this.changeEiningar = this.changeEiningar.bind(this);
    this.changeSkiptitimar = this.changeSkiptitimar.bind(this);
    this.changeSynidaemi = this.changeSynidaemi.bind(this);
    this.changeKennsluvikur = this.changeKennsluvikur.bind(this);
    this.changeKennslustundir = this.changeKennslustundir.bind(this);
    this.changeLengd = this.changeLengd.bind(this);
    this.changeFjoldi = this.changeFjoldi.bind(this);


    this.addAfangi = this.addAfangi.bind(this);
    this.addHopur = this.addHopur.bind(this);
    this.removeHopur = this.removeHopur.bind(this);

  }  

  changeHeiti(heiti) {
    
    this.setState((state)=>{
      return {heiti: heiti,
              heitiNotEmpty: heiti.trim() !== '',
              disabled: heiti.trim() === '' || !state.einingarIsNumber || !state.skiptitimarIsNumber
      }
    })
    
  };

  changeEiningar(einingar) {
    if (this.state.synidaemi === 'Hægferð')
      this.setState((state)=> {
        const isNumber = (isNaN(einingar.replace(',','.')) || einingar.trim() === '')? false:true;
        return {einingar: '2',
                  einingarIsNumber: isNumber,
                  disabled: !isNumber || !state.heitiNotEmpty || !state.skiptitimarIsNumber
              }})
      else
        this.setState((state)=> {
          const isNumber = (isNaN(einingar.replace(',','.')) || einingar.trim() === '')? false:true;
          return {einingar: einingar,
                  einingarIsNumber: isNumber,
                  disabled: !isNumber || !state.heitiNotEmpty || !state.skiptitimarIsNumber
          }
        })
    
  };
  changeSkiptitimar(skiptitimar) {
      
      this.setState((state)=> {
        const isNumber = (isNaN(skiptitimar.replace(',','.')) || skiptitimar.trim() === '')? false:true;
        return {  skiptitimar: skiptitimar,
                  skiptitimarIsNumber: isNumber,
                  disabled: !isNumber || !state.heitiNotEmpty || !state.einingarIsNumber
        }
      })
    
  };

  changeSynidaemi(synidaemi) {
    if (synidaemi === 'Hægferð')
      this.setState({synidaemi: synidaemi,einingar: '2'})
    else
      this.setState({synidaemi: synidaemi})

    if (synidaemi !=='Raungreinar')
      this.setState({skiptitimarIsNumber: true,skiptitimar: '0'})

  }

  changeKennsluvikur(kennsluvikur) {
    this.setState({kennsluvikur: kennsluvikur})
  }

  changeKennslustundir(kennslustundir) {
    this.setState({kennslustundir: kennslustundir})
  }

  changeLengd(lengd) {
    this.setState({lengdKst: lengd})
  }

  changeFjoldi(index,fjoldi) {
    this.setState((state)=> {
      let hopar_nyr = state.hopar;
      hopar_nyr[index] = {fjoldi: fjoldi};
      return {...state,
              hopar: hopar_nyr
      }
    });
  }
  addHopur() {
    this.setState((state)=> {

      let hopar_nyr = state.hopar;
      hopar_nyr.push({fjoldi: 25});
      return {
          ...state,
          hopar: hopar_nyr
      }
    });
  }
  removeHopur(event) {
    this.setState((state)=> {
      let hopar_nyr = state.hopar.length > 1 ?state.hopar.slice(0,state.hopar.length-1): state.hopar;
      return {
          ...state,
          hopar: hopar_nyr
      }
    });
  }
  addAfangi() {
    const {dispatch} = this.props;

    dispatch(addAfangi({...this.state}));
  }
  
  render() {
    return (
      <div> 
        <div style={{display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'flex-start'}}
        >
          <div style={{...styles.thumb, ...this.props.mobilestyle}}>
              <h4>Grunnupplýsingar</h4>
              <HeitiView textalitur={grey900} focuslitur={deepOrangeA400} heiti={this.state.heiti} changeHeiti={this.changeHeiti}/>
              <br/>
              <EiningarView textalitur={grey900} focuslitur={deepOrangeA400} einingar={this.state.einingar} changeEiningar={this.changeEiningar}/>
              <br/>
              <SynidaeminView textalitur={grey900} focuslitur={deepOrangeA400} synidaemi={this.state.synidaemi} changeSynidaemi={this.changeSynidaemi}/>
          </div>
          <div style={{...styles.thumb, ...this.props.mobilestyle}}>
              <h4>Staðin kennsla</h4>
              <VikurView textalitur={grey900} focuslitur={deepOrangeA400} kennsluvikur={this.state.kennsluvikur} changeKennsluvikur={this.changeKennsluvikur}/>
              <br/>
              <KennslustundirView textalitur={grey900} focuslitur={deepOrangeA400} kennslustundir={this.state.kennslustundir} changeKennslustundir={this.changeKennslustundir}/>
              <br/>
              <LengdView textalitur={grey900} focuslitur={deepOrangeA400} lengd={this.state.lengdKst} changeLengd={this.changeLengd}/>
              {
                this.state.synidaemi==='Raungreinar' &&
                <div>
                <br/>
                <SkiptitimarView textalitur={grey900} focuslitur={deepOrangeA400} skiptitimar={this.state.skiptitimar} changeSkiptitimar={this.changeSkiptitimar}/>
                </div>
              }
          </div>
          <div style={{...styles.thumb, ...this.props.mobilestyle}}>
              <h4>Fjöldi hópa 
                  <Badge
                    badgeContent={this.state.hopar.length}
                    primary={true}
                    badgeStyle={{top: 20, right: 5,bottom: 20, backgroundColor: deepOrangeA400}}
                  />
              </h4>
              {
                this.state.hopar.map((item,index) => <FjoldiView textalitur={grey900} focuslitur={deepOrangeA400} key={index} index={index} fjoldi={item.fjoldi} changeFjoldi={this.changeFjoldi}/>)
              }
              <br/>
              <div style={{width: '100%'}}>
              <FloatingActionButton mini={true} 
                                    style={{marginRight: 20, float: 'right'}} 
                                    backgroundColor={deepOrangeA400}
                                    onClick={this.addHopur}
              >
                <ContentAdd />
              </FloatingActionButton>
              <FloatingActionButton mini={true} 
                                    style={{marginRight: 20, float: 'right'}} 
                                    backgroundColor={deepOrangeA400}
                                    onClick={this.removeHopur}
              >
                <ContentRemove/>
              </FloatingActionButton>
              </div>
          </div>
        </div>
        <div style={{width: '100%'}}>
              <FloatingActionButton style={{marginRight: 20, float: 'right'}} 
                disabled={this.state.disabled} 
                backgroundColor={deepOrangeA400} 
                onClick={this.addAfangi}>
                <ContentAdd />
              </FloatingActionButton>
        </div>
      </div>
    );
  }
}

export default connect()(CourseFormView)