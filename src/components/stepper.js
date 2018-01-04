import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import Media from 'react-media';
import Rusl from 'material-ui/svg-icons/action/delete';
import Vista from 'material-ui/svg-icons/content/create';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import AboutTeacherView from './aboutTeacherView.js';
import CoursesFormView from './coursesFormView.js';
import Nidurstodur from './nidurstodur.js';
import NidurstodurSundurlidun from './nidurstodurSundurlidun.js';
import NidurstodurSundurlidunMobile from './nidurstodurSundurlidunMobile.js';

import Endurtaka from 'material-ui/svg-icons/action/autorenew';
import IconButton from 'material-ui/IconButton';
import {storeData,deleteData} from '../utils';
import {refresh} from '../actions';
import {connect} from 'react-redux';

class StepperProgress extends React.Component {

  state = {
    finished: false,
    stepIndex: 0,
    afram: true
  };


  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };
  handleInvalid = (afram)=> {
    this.setState({afram: afram})
  }


  delete=()=> {
    deleteData();
    this.props.dispatch(refresh());
    this.setState({stepIndex: 0, finished: false});
  }

  vista= ()=> {

    storeData(this.props.storeState);
  }
  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <Media query="(max-width: 768px)">
              {matches =>
                matches ? <AboutTeacherView invalid={this.handleInvalid} mobilestyle={{width: '100%'}}/>:<AboutTeacherView invalid={this.handleInvalid} mobilestyle={{width: '25%'}}/>
              }
            </Media>
          </div>
        )
      case 1:
        return (
          <div>
            <Media query="(max-width: 768px)">
              {matches =>
                matches ? <CoursesFormView mobilestyle={{width: '100%'}} mini={true}/>:<CoursesFormView mobilestyle={{width: '25%'}} mini={false}/>
              }
            </Media>
          </div>
        )
      case 2:
        return (
          <div>
            <Media query="(max-width: 768px)">
              {matches =>
                matches ?<Nidurstodur mobilestyle={{width: '100%'}}/>:<Nidurstodur mobilestyle={{width: '25%'}}/>
              }
            </Media>
          </div>
        )
      default:
        return 'Kemst ekki';
    }
  }

  render() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};

    return (
      <div style={{width: '100%', maxWidth: 1000, margin: 'auto'}}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel active={true}>Um kennara</StepLabel>
          </Step>
          <Step>
            <StepLabel>Um áfanga</StepLabel>
          </Step>
          <Step>
            <StepLabel>Niðurstöður</StepLabel>
          </Step>
        </Stepper>
        <div style={contentStyle}>
          {finished ? (
            <div>
            <div>
              <IconButton
                iconStyle={{color: this.props.iconColor}}
                onClick={(event)=>{
                  event.preventDefault();
                  this.setState({stepIndex: 0, finished: false});
                }}
                tooltip={'Yfirfara'}
              >
                <Endurtaka/>
              </IconButton>
              <IconButton 
                iconStyle={{color: this.props.iconColor, float: 'right'}}
                onClick={this.vista}
                tooltip={'Vista í vafra'}
              >
                <Vista/>
              </IconButton>
              <IconButton 
                iconStyle={{color: this.props.iconColor, float: 'right'}}
                onClick={this.delete}
                tooltip={'Eyða úr vafra'}
              >
                <Rusl/>
              </IconButton>
              
            </div>
            <Media query="(max-width: 425px)">
              {matches =>
                matches?<NidurstodurSundurlidunMobile/>:<NidurstodurSundurlidun st={{pageBreakAfter: 'always'}}/>
                              
              }
            </Media>
            
            </div>
          ) : (
            <div>
              {this.getStepContent(stepIndex)}
              <div style={{marginTop: 12}}>
                <FlatButton
                  label="Aftur"
                  disabled={stepIndex === 0}
                  onClick={this.handlePrev}
                  style={{marginRight: 12,marginTop: 10}}
                />
                <RaisedButton
                  label={stepIndex === 2 ? 'Enda' : 'Fram'}
                  backgroundColor={this.props.iconColor}
                  labelColor='#FFFFFF'
                  style={{marginTop: 10}}
                  onClick={this.handleNext}
                  disabled={!this.state.afram}
                />
              </div>
            </div>
          )}
          
          
          
          
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state)=>({
  storeState: {...state}
});

export default connect(mapStateToProps)(StepperProgress);
