import React, { Component } from 'react';
import { Row, Col } from 'antd';
import basicStyle from '../../config/basicStyle';
import IsoWidgetsWrapper from './widgets-wrapper';
import ReportsWidget from './report/report-widget';
import Tabs, { TabPane } from '../../components/uielements/tabs';
import Teacher from '../Teacher';
import Subjects from '../Subjects';
import Classes from '../Classes';
import FacaultyMap from '../FacaultyMap'
import TimeTable from '../TimeTable'


const wisgetPageStyle = {
      display: 'flex',
      flexFlow: 'row wrap',
      alignItems: 'flex-start',
      padding: '15px',
      overflow: 'hidden'
};

export default class IsoWidgets extends Component {
  render() {
    const { rowStyle, colStyle } = basicStyle;
    return (
      <div style={wisgetPageStyle}> 
        <Row style={rowStyle} gutter={0} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              <ReportsWidget>
                <Tabs defaultActiveKey="1">
                <TabPane tab="Teachers" key="1">
                    <Teacher></Teacher>
                </TabPane>
                <TabPane tab="Subjects" key="2">
                    <Subjects></Subjects>
                </TabPane>
                <TabPane tab="Classes" key="3">
                      <Classes></Classes>
                </TabPane>
                <TabPane tab="Facaulty Map" key="4">
                    <FacaultyMap />
                </TabPane>
                <TabPane tab="Time Table" key="5">
                    <TimeTable />
                </TabPane>
            </Tabs>
            </ReportsWidget>
          </IsoWidgetsWrapper>
        </Col>
      </Row>
    </div>
    );
  }
}
