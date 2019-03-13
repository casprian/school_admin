import React, { Component } from 'react';
import IsoWidgetsWrapper from '../Widgets/widgets-wrapper';
import Select, { SelectOption } from '../../components/uielements/select';
import Button from '../../components/uielements/button';
import { GoogleChart } from '../Charts/googleChart/';
import Card from '../Uielements/Card/card.style';
import { Row, Col } from 'antd';
import * as plots from './graph_data';

import ContentHolder from '../../components/utility/contentHolder';
import CollapseWrapper from '../Uielements/Collapse/collapse.style';
import Collapses from '../../components/uielements/collapse';

import {teacherApi} from '../../api';

const Panel = Collapses.Panel;
const Collapse = props => (
  <CollapseWrapper>
    <Collapses {...props}>{props.children}</Collapses>
  </CollapseWrapper>
);
const Option = SelectOption;

export default class Insights extends Component {

  getInsights = (ev) => {
    
  }

  callbackCountryChange = (country) => {
    console.log(country)
    this.setState({'country_selected':country});
    if(country === 'usa'){
      this.setState({'USA_Selected':true});
    } else {
      this.setState({'USA_Selected':false});
    }
  }

  callbackCommodityChange = (commodity) => {
    console.log(commodity);
    this.setState({'commodity_selected':commodity});
  }

  constructor(){
    super();
    this.state = {
      chart_data_export : '',
      chart_data_import:'',
      country_selected : '',
      USA_Selected : false,
      commodity_selected:''
    }
  }

  render() {
    const {chart_data_export,chart_data_import,country_selected} = this.state;
  	const chartEvents = [
      {
        eventName: 'select',
        callback(Chart) {}
      }
    ];

    
    let chart_data = '';
    let export_country = 'Export - '+country_selected.charAt(0).toUpperCase()+ country_selected.slice(1);
    let import_country = 'Import - '+country_selected.charAt(0).toUpperCase()+ country_selected.slice(1);
    let export_panel = '';
    let import_panel = '';

    if(chart_data_export === '' && chart_data_import ===''){
      chart_data = (<IsoWidgetsWrapper>
                  <div style={{opacity:'0.3'}}>
                      <span style={{fontSize:'15px',color:'#000'}}>No Filters has been selected.
                      </span>
                    </div>
                </IsoWidgetsWrapper>);
    }
    else {
      if(chart_data_export !== ''){
        export_panel = (<Panel
                            header= {export_country}
                            key="1"
                          >
                          <GoogleChart
                            {...chart_data_export}
                            chartEvents={chartEvents}
                          />
                          </Panel>)
      }
      if(chart_data_import !== ''){
          import_panel = (<Panel
                            header= {import_country}
                            key="2"
                          >
                          <GoogleChart
                            {...chart_data_import}
                            chartEvents={chartEvents}
                          />
                          </Panel>)
      }
      chart_data = (
        <Collapse defaultActiveKey={['1','2']}>
          {export_panel}
          {import_panel}       
        </Collapse>
      );
    }


    return (
       <IsoWidgetsWrapper style={{minHeight:'87vh'}}>
       	
        <Row>
          <Card>
              <h3> <i className='ion-funnel'></i>
                  <span style={{display:'inline-block',marginLeft:'8px'}}>Select Filters</span> 
              </h3>

              <Col md={5} sm={24}>
              <span>
                <Select style={{width:'90%'}}
                  defaultValue="0"
                  onChange={event => this.callbackCountryChange(event)}
                >
                  <Option value='0'>Country</Option>
                  <Option value='brazil'>Brazil</Option>
                  <Option value='denmark'>Denmark</Option>
                  <Option value='india'>India</Option>
                  <Option value='Japan'>Japan</Option>
                  <Option value='usa'>USA</Option>
                  <Option value='Australia'>Australia</Option>
                </Select>
              </span>
              </Col>

              <Col md={5} sm={24} style={{ display: this.state.USA_Selected ? 'block' : 'none' }}>
              <span >
                <Select style={{width:'90%'}}
                defaultValue="0"
                onChange={event => this.callbackCommodityChange(event)}
                >
                  <Option value='0'>Commodity</Option>
                  <Option value='vehicles'>Vehicles</Option>
                  <Option value='paper'>Paper</Option>
                  <Option value='meat'>Meat</Option>
               </Select>
             </span>
             </Col>

             <Col md={5} sm={24}>
             <span>
                <Button disabled={ (this.state.country_selected == '') } 
                        type='primary'
                        onClick={event => this.getInsights(event)} > Forecast </Button> 
              </span>
              </Col>
          </Card>
        </Row>

        <Row>
       		<Col md={24}> 
            <Card> 
              {chart_data}   
            </Card>
          </Col>
       	</Row>
       </IsoWidgetsWrapper>
    );
  }
}
