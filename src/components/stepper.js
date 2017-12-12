import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import AboutTeacherView from './aboutTeacherView.js';
import CoursesFormView from './coursesFormView.js';

class StepperProgress extends React.Component {

  state = {
    finished: false,
    stepIndex: 0,
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

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <AboutTeacherView/>;
      case 1:
        return <CoursesFormView/>;
      case 2:
        return 'Hér munu niðurstöður birtast';
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
            <StepLabel active={true}>Upplýsingar um kennara</StepLabel>
          </Step>
          <Step>
            <StepLabel>Upplýsingar um áfanga</StepLabel>
          </Step>
          <Step>
            <StepLabel>Niðurstöður</StepLabel>
          </Step>
        </Stepper>
        <div style={contentStyle}>
          {finished ? (
            <p>
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  this.setState({stepIndex: 0, finished: false});
                }}
              >
                Byrja aftur
              </a> Niðurstöður koma hér fyrir neðan
            </p>
          ) : (
            <div>
              {this.getStepContent(stepIndex)}
              <div style={{marginTop: 12}}>
                <FlatButton
                  label="Aftur"
                  disabled={stepIndex === 0}
                  onClick={this.handlePrev}
                  style={{marginRight: 12}}
                />
                <RaisedButton
                  label={stepIndex === 2 ? 'Enda' : 'Áfram'}
                  backgroundColor={this.props.iconColor}
                  labelColor='#FFFFFF'
                  onClick={this.handleNext}
                  disabled={false}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default StepperProgress;