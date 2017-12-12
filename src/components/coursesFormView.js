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
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Badge from 'material-ui/Badge';


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


export default class CoursesFormView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      heiti: '',
      einingar: 3,
      synidaemi: 'Stærðfræði',
      kennsluvikur: 15,
      kennslustundir: 6,
      lengdKst: 40,
      hopar: [25],
      errorTextHeiti: '',
      errorTextEiningar: ''
    }

    this.changeHeiti= this.changeHeiti.bind(this);
    this.addAfangi = this.addAfangi.bind(this);

  }  

  changeHeiti(h) {
    this.setState({heiti: h})
    
  };
  addAfangi(event) {
    console.log(this.state);
  }

  render() {
    return (
      <div> 
        <div style={{display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'flex-start'}}
        >
          <div style={styles.thumb}>
              <h4>Grunnupplýsingar</h4>
              <HeitiView textalitur={grey900} focuslitur={deepOrangeA400} heiti={this.state.heiti} changeHeiti={this.changeHeiti}/>
              <br/>
              <EiningarView textalitur={grey900} focuslitur={deepOrangeA400}/>
              <br/>
              <SynidaeminView textalitur={grey900} focuslitur={deepOrangeA400}/>
          </div>
          <div style={styles.thumb}>
              <h4>Staðin kennsla</h4>
              <VikurView textalitur={grey900} focuslitur={deepOrangeA400}/>
              <br/>
              <KennslustundirView textalitur={grey900} focuslitur={deepOrangeA400}/>
              <br/>
              <LengdView textalitur={grey900} focuslitur={deepOrangeA400}/>
          </div>
          <div style={styles.thumb}>
              <h4>Fjöldatölur 
                  <Badge
                    badgeContent={1}
                    primary={true}
                    badgeStyle={{top: 20, right: 5,bottom: 20, backgroundColor: deepOrangeA400}}
                  />
              </h4>
              <FjoldiView textalitur={grey900} focuslitur={deepOrangeA400}/>
              <br/>
              <div style={{width: '100%'}}>
              <FloatingActionButton mini={true} style={{marginRight: 20, float: 'right'}} backgroundColor={deepOrangeA400}>
                <ContentAdd />
              </FloatingActionButton>
              </div>
          </div>
        </div>
        <div style={{width: '100%'}}>
              <FloatingActionButton style={{marginRight: 20, float: 'right'}} backgroundColor={deepOrangeA400} onClick={this.addAfangi}>
                <ContentAdd />
              </FloatingActionButton>
        </div>
      </div>
    );
  }
}

