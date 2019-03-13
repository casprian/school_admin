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
import ReactTable from "react-table";
import "react-table/react-table.css";
import {classApi} from '../../api';
import Tags from '../../components/uielements/tag';
import TagWrapper from '../Uielements/Tag/tag.style';
import { Chart } from "react-google-charts";

import Modals from '../../components/feedback/modal';
import ModalStyle, { ModalContent } from '../Feedback/Modal/modal.style';
import WithDirection from '../../config/withDirection';

import AddClass from './add_class';

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

export default class Classes extends Component {  
  constructor() {
    super();
    this.state = {
      data: [],
      pages: null,
      loading: true,
      sidebarOpen: false,
      division_by_students:[],
      subjects : [],
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
  
  fetchData(state, instance) {
    // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
    // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
    this.setState({ loading: true });
    // Request the data however you want.  Here, we'll use our mocked service we created earlier
    classApi.getClasses({}).then(res => {
      let pages = 1;
      pages = parseInt(res.data.result.length/5,10);
      this.setState({
          data: res.data.result,
          pages: pages,
          loading: false,
          division_by_students : [['Class Name','Students'],['1 - A Section',50],['2 - A Section',50],['3 - A Section',50]]
      });
    });
  }

  componentDidMount(){
    this.fetchData();
  }

  render() {
    const { data, pages, loading , division_by_students} = this.state;   
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
                    <AddClass claseModal={this.handleCancel} reload={this.fetchData}/>
                  </p>
                </Modal>

        <Row>
          <Col md={24}>
            <div style={{display:data.length>0?'none':'block'}}>
              <p  style={{padding:'20px',color:'red',fontSize:'25px'}}>
                No Class have been registered kindly click Add New Teacher Button and register the same
              </p>
            </div>

            <Button type="primary" style={{float:'right',marginBottom:'5px'}} onClick={() => this.showModal()}>
                <span style={{display:'inline-block',marginRight:'10px'}}>Add New Class</span> <i class="ion-ios-plus" style={{fontSize:'20px'}}></i>
            </Button>   
          </Col>
        </Row>

        <Row>
          <Col md={14} sm={24}>  
              <ReactTable
              columns={[
                {
                  Header: "Course",
                  accessor: "course"
                },
                {
                  Header: "Name",
                  accessor: "name"
                },
                {
                  Header: "Section",
                  accessor: "section"
                },
                {
                  Header: "Class Location Details",
                  accessor: "building_details"
                }
              ]}
              style={{
                height: "420px",
                 // This will force the table body to overflow and scroll, since there is not enough room
              }}
              data={data}
              onFetchData={this.fetchData} // Request new data when things change
              defaultPageSize={6}
              className="-striped -highlight"
              />
          </Col>
          <Col md={10} sm={24}>
            <Box title="Division of classes by No of students [DUMMY DATA]">
            <Chart
              height={350}
              chartType="ColumnChart"
              loader={<div>Loading Chart</div>}
              data={division_by_students}
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

