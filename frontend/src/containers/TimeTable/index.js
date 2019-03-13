import React, { Component } from 'react'
import {classApi} from '../../api'
import { Row, Col } from 'antd';
import Button from '../../components/uielements/button';
import Steps, { Step } from 'rc-steps';
import 'rc-steps/assets/index.css';
import 'rc-steps/assets/iconfont.css';
import Box from '../../components/utility/box';
import ContentHolder from '../../components/utility/contentHolder';
import TimeTableFilter from './TimetableFilter'
import GeneratedTimeTable from './GeneratedTimeTable'
import HolidayConfiguration from './HolidayConfiguration'
const description ='';

export default class TimeTable extends Component {  
  constructor() {
    super();
    this.state = {
      currentStep:0,
    };
    this.nextStep = this.nextStep.bind(this);
    this.preStep = this.preStep.bind(this);
  }

  nextStep() {
    this.setState({
        'currentStep':parseInt(this.state.currentStep,10)+1
    }) 
  }

  preStep() {
    this.setState({
        'currentStep':parseInt(this.state.currentStep,10)-1
    }) 
  }

  render() {
    const {currentStep} = this.state;
    
    return (
      <div>
        <Row>
        <Col md={24}>
          <Steps labelPlacement="vertical" current={currentStep}>
            <Step title="Select Date Range" description={description} />
            <Step title="Select Holidays" description={description} />
            <Step title="Confirm" description={description} />
            <Step title="Time Table" description={description} />
          </Steps>
       </Col>
        </Row>

        <Row>
          <Col md={24}>
              <div style={{height:'350px'}}>
                  <div style={{ display: (currentStep == 0) ? 'block' : 'none' }}>
                    <TimeTableFilter/>
                  </div>

                  <div style={{ display: (currentStep == 1) ? 'block' : 'none' }}>
                    <HolidayConfiguration/>
                  </div>

                  <div style={{ display: (currentStep == 2) ? 'block' : 'none' }}>
                    VERIFY
                  </div>

                  <div style={{ display: (currentStep == 3) ? 'block' : 'none' }}>
                    <GeneratedTimeTable/>
                  </div>
              </div>
              <div style={{float:'right'}}>

                 <Button  style={{float:'right',display: (currentStep > 2) ? 'none' : 'block'}} onClick={this.nextStep} type="primary">
                  Next <i className='ion-ios-arrow-farword'></i>
                 </Button>
                 
                 <Button style={{marginRight:'10px',float:'left',display: (currentStep > 0) ? 'block' : 'none' }} onClick={this.preStep} type="primary">
                    <i className='ion-ios-arrow-back'></i> previous
                 </Button>
              </div>
          </Col>
        </Row>
      </div>
    );
  }
}

