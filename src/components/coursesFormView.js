import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
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

import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';

import Badge from 'material-ui/Badge';
import {connect} from 'react-redux';
import {addAfangi,deleteAfangi} from '../actions'; 


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
      skiptitimar: '0',
      heitiNotEmpty: false,
      einingarIsNumber: true,
      skiptitimarIsNumber: true,
      disabled: true,
      afangar: props.afangar,
      heitin: Object.keys(props.afangar),
      selectedHeiti: null
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
    this.handleChangeSelectedHeiti = this.handleChangeSelectedHeiti.bind(this);
    this.deleteAfangi = this.deleteAfangi.bind(this);
  }  
  
  componentWillReceiveProps(nextProps) {
    this.setState({afangar: nextProps.afangar,
                   heitin: Object.keys(nextProps.afangar)
    });
  }
  changeHeiti(heiti) {
    
    this.setState((state)=>{
      return {heiti: heiti,
              heitiNotEmpty: heiti.trim() !== '',
              disabled: heiti.trim() === ''|| heiti.indexOf(',') !== -1 || heiti.indexOf(';') !== -1 || !state.einingarIsNumber || !state.skiptitimarIsNumber
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

    dispatch(addAfangi({
      heiti: this.state.heiti,
      einingar: this.state.einingar,
      synidaemi: this.state.synidaemi,
      kennsluvikur: this.state.kennsluvikur,
      kennslustundir: this.state.kennslustundir,
      lengdKst: this.state.lengdKst,
      hopar: this.state.hopar,
      skiptitimar: this.state.skiptitimar
    }));
    this.setState({selectedHeiti: null});
  }
  deleteAfangi(event) {
    const {dispatch} = this.props;

    dispatch(deleteAfangi(this.state.selectedHeiti));
    this.setState({
      selectedHeiti: null,
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
    });
   
  }
  handleChangeSelectedHeiti(event,index,value) {
  
    if (value===null) {
      this.setState({
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
        disabled: true,
        selectedHeiti: null}
      );
    }
    else {
      const afangi = this.state.afangar[value];
      this.setState({
        selectedHeiti: value,
        heiti: afangi.heiti,
        einingar: afangi.einingar.toString(),
        synidaemi: afangi.synidaemi,
        kennsluvikur: afangi.kennsluvikur,
        kennslustundir: afangi.kennslustundir,
        lengdKst: afangi.lengdKst,
        hopar: afangi.hopar,
        heitiNotEmpty: true,
        einingarIsNumber: true,
        skiptitimarIsNumber: true,
        skiptitimar: afangi.skiptitimar.toString(),
        disabled: false,

      });
    }

  }
  render() {
    
    return (
      <div>
        <div style={{display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'flex-start'}}>
          {this.state.heitin.length > 0 &&
            <div style={{paddingLeft: '30px'}}>
            <SelectField
            floatingLabelText="Vistaðir áfangar"
            value={this.state.selectedHeiti}
            onChange={this.handleChangeSelectedHeiti}
            floatingLabelStyle={{color: grey900}}
            underlineFocusStyle={{borderColor: deepOrangeA400}}
            selectedMenuItemStyle={{color: deepOrangeA400}}
            >
              <MenuItem value={null} primaryText="" />
              {
                this.state.heitin.map((heiti)=> <MenuItem key={heiti} value={heiti} primaryText={heiti} />)
              }
            </SelectField>
            </div>
          }
          {this.state.selectedHeiti &&
            <div>
              <IconButton 
                style={{marginRight: 50, marginTop: 20, float: 'right'}}
                iconStyle={{color: deepOrangeA400}}
                onClick={this.deleteAfangi}
                tooltip={'Eyða völdum áfanga'}
              >
                
                <ContentRemove />
              </IconButton>
            </div>
          }  
        </div>
      
        <div style={{display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'flex-start'}}>
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
              <IconButton  
                                    style={{marginRight: 20, float: 'right'}} 
                                    iconStyle={{color: deepOrangeA400}}
                                    onClick={this.addHopur}
              >
                <ContentAdd />
              </IconButton>
              <IconButton 
                style={{marginRight: 0, float: 'right'}}
                iconStyle={{color: deepOrangeA400}} 
                onClick={this.removeHopur}
              >
                <ContentRemove/>
              </IconButton>
              </div>
          </div>
        </div>
         <div style={{width: '100%'}}>
              <RaisedButton 
                style={{marginRight: 10, marginTop: 10, float: 'right', width:'20%',...this.props.mobilestyle}}
                backgroundColor={deepOrangeA400}
                labelColor='#FFFFFF'
                label={'Bæta við (vista) áfanga'} 
                disabled={this.state.disabled} 
                onClick={this.addAfangi}/>
        </div>   
      </div>


    );
  }
}

const mapStateToProps = (state)=> ({
    afangar: state.afangar,
    heitin: Object.keys(state.afangar)
});

export default connect(mapStateToProps)(CourseFormView)