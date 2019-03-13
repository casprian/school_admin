import React, { Component } from 'react';
import clone from 'clone';
import { Row, Col } from 'antd';
import basicStyle from '../../config/basicStyle';
import Button from '../../components/uielements/button';
import Box from '../../components/utility/box';
import userpic from '../../image/user1.png';
import { TableViews, tableinfos, dataList } from '../Tables/antTables';
import * as rechartConfigs from '../Charts/recharts/config';
import { StackedAreaChart } from '../Charts/recharts/charts/';
import { GoogleChart } from '../Charts/googleChart/';
import * as googleChartConfigs from '../Charts/googleChart/config';
import IntlMessages from '../../components/utility/intlMessages';
import Tabs, { TabPane } from '../../components/uielements/tabs';
import CollapseWrapper from '../Uielements/Collapse/collapse.style';
import Collapses from '../../components/uielements/collapse';
import Card from '../Uielements/Card/card.style';
import {teacherApi} from '../../api';
import Sidebar from "react-sidebar";
import Tags from '../../components/uielements/tag';
import TagWrapper from '../Uielements/Tag/tag.style';
import { Chart } from "react-google-charts";
import _ from "lodash";

import ReactTable from "react-table";
import "./index.css";
import "react-table/react-table.css";

import Modals from '../../components/feedback/modal';
import ModalStyle, { ModalContent } from '../Feedback/Modal/modal.style';
import WithDirection from '../../config/withDirection';

import AddTeacher from './add_teacher';

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);
const confirm = Modals.confirm;

const barOptions = {
  legend: {
    position: "bottom",
    alignment: "center",
    textStyle: {
      color: "233238",
      fontSize: 12
    }
  },
  tooltip: {
    showColorCode: true
  },
  chartArea: {
    left: 25,
    top: 20,
    width: "90%",
    height: "80%"
  },
};

const Tag = props => (
  <TagWrapper>
    <Tags {...props}>{props.children}</Tags>
  </TagWrapper>
);

const Panel = Collapses.Panel;
const Collapse = props => (
  
<CollapseWrapper>
  <Collapses {...props}>{props.children}</Collapses>
</CollapseWrapper>
);

function callback(key) {}

export default class Teacher extends Component {  
  constructor() {
    super();
    this.state = {
      data: [],
      loading: true,
      division_by_qualification:[],
      visible: false,
    };
    this.fetchData = this.fetchData.bind(this);
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  addTeacher = (ev) =>{
  }

  fetchData(state, instance) {
    // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
    // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
    this.setState({ loading: true });
    // Request the data however you want.  Here, we'll use our mocked service we created earlier
    teacherApi.getTeachers({}).then(res => {
      let teachers_result = [],division_by_qualification = [];
      teachers_result = res.data.result;
      let total_teachers = teachers_result.length;

      let result = _.chain(teachers_result).groupBy("highest_qualification").map(function(teachers,highest_qualification){
        return [highest_qualification,teachers.length]
      }).value()

      let chart_title = [['Highest Qualification', 'By Teachers']];
      division_by_qualification = chart_title.concat(result);


      this.setState({
          data: teachers_result,
          loading: false,
          division_by_qualification : division_by_qualification,
      });
    });
  }

  componentDidMount(){
    //this.fetchData();
  }

  render() {
    const { data,loading,division_by_qualification} = this.state;
   
    return (
      <div>
                <Modal
                  visible={this.state.visible}
                  title="Title"
                  footer={[]}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                  >
                  <p>
                    <AddTeacher claseModal={this.handleCancel} reload={this.fetchData}/>
                  </p>
                </Modal>

        <Row>
          <Col md={24}>
            <div style={{display:data.length>0?'none':'block'}}>
              <p style={{padding:'20px',color:'red',fontSize:'25px'}}>
                No teacher have been registered kindly click Add New Teacher Button and register the same
              </p>
            </div>

            <Button type="primary" style={{float:'right',marginBottom:'5px'}} onClick={() => this.showModal()}>
                <span style={{display:'inline-block',marginRight:'10px'}}>Add New Teacher</span> 
                  <i className="ion-ios-plus" style={{fontSize:'20px'}}></i>
            </Button>   
          </Col>
        </Row>

        <Row style={{display:data.length>0?'block':'none'}}>
          <Col md={12} sm={24}>  
              <ReactTable
              columns={[
                {
                  Header: "First Name",
                  accessor: "first_name"
                },
                {
                  Header: "Last Name",
                  accessor: "last_name"
                },
                {
                  Header: "Email",
                  accessor: "email",
                },
                {
                  Header: "Mobile",
                  accessor: "mobile_number",
                },
                {
                  Header: "Other Subjects",
                  accessor: "other_subjects",
                  show:false,
                },
                {
                  Header: "Primary Subjects",
                  accessor: "primary_subject",
                  show:false,
                },
                {
                  Header: "Highest Qualification",
                  accessor: "highest_qualification",
                  show:false,
                },
                {
                  Header: "Description",
                  accessor: "description",
                  show:false,
                },
              ]}
               style={{
                height: "420px",
                 // This will force the table body to overflow and scroll, since there is not enough room
              }}
              data={data}
              onFetchData={this.fetchData} 
              className="-striped -highlight"
              defaultPageSize={7}
              SubComponent={(row) => {
                    let other_sub = '';
                    other_sub = row.row.other_subjects.map(item => (<Tag color="#4482FF">{item}</Tag>)) 
                    return (
                      <p style={{padding:"10px",background:"#666",color:"#fff"}}>
                        <table>
                          <tr><td><strong>Highest Qalification</strong></td><td>{row.row.highest_qualification} </td></tr>
                          <tr><td><strong>Primary Subject</strong></td><td><Tag color="#f64744">{row.row.primary_subject}</Tag></td></tr>
                          <tr><td><strong>Secodary Subjects</strong></td><td>{other_sub}</td></tr>
                          <tr><td><strong>Description (Hobbies / Certificates)</strong></td><td>{row.row.description}</td></tr>
                        </table>
                      </p>
                    )
              }} 
              />
          </Col>

          <Col md={12} sm={24}>
          <Box title="Division of teachers by Highest Qualification">
            <Chart
              height={350}
              chartType="ColumnChart"
              loader={<div>Loading Chart</div>}
              data={division_by_qualification}
              options={barOptions}
              legendToggle
            />
            </Box>
          </Col>
        </Row>
      </div>
    );
  }
}

