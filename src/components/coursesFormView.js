import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AgeView from './ageView.js';
import LaunaflokkurView from './launaflokkurView.js';
import ThrepView from './threpView.js';
import StarfshlutfallView from './starfshlutfallView.js';
import SynidaeminView from './synidaeminView.js';

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


export default class CoursesFormView extends Component {

    state = {
      heiti: 'STÆR2HS05',
      einingar: 3,
      starfshlutfall: false,
      errorTextHeiti: '',
      errorTextEiningar: ''
    }
  

  handleChange = (event) => {
    
    this.setState({heiti: event.target.value,
                  errorTextHeiti: event.target.value === '' ? 'Hvað heitir áfanginn?': ''

    });    
  };
  handleChangeEiningar = (event) => {
    
     this.setState({einingar: event.target.value,
                  errorTextEiningar: (isNaN(event.target.value.replace(',','.')) || event.target.value.trim() === '')? 'Verður að hafa tölu': ''

    });
    
    

  };


  render() {
    return (
      <div> 
        <div style={{display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'flex-start'}}
        >
          <div style={styles.main}>
          
              <TextField
                value={this.state.heiti}
                floatingLabelText="Heiti"
                floatingLabelStyle={{color: grey900}}
                underlineFocusStyle={{borderColor: deepOrangeA400}}
                onChange={this.handleChange}
                errorText={this.state.errorTextHeiti}

              />
              <br/>
              <TextField
                value={this.state.einingar}
                floatingLabelText="Einingar"
                floatingLabelStyle={{color: grey900}}
                underlineFocusStyle={{borderColor: deepOrangeA400}}
                onChange={this.handleChangeEiningar}
                errorText={this.state.errorTextEiningar}

              />
              <br/>
              <SynidaeminView textalitur={grey900} focuslitur={deepOrangeA400}/>
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
          {this.state.laun &&
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

