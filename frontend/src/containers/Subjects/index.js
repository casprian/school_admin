import React, { Component } from 'react';
import clone from 'clone';
import { Row, Col } from 'antd';
import basicStyle from '../../config/basicStyle';
import Button from '../../components/uielements/button';
import Box from '../../components/utility/box';
import Tabs, { TabPane } from '../../components/uielements/tabs';
import CollapseWrapper from '../Uielements/Collapse/collapse.style';
import Collapses from '../../components/uielements/collapse';
import Card from '../Uielements/Card/card.style';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {subjectApi} from '../../api';
import {teacherApi} from '../../api';
import Tags from '../../components/uielements/tag';
import TagWrapper from '../Uielements/Tag/tag.style';
import { Chart } from "react-google-charts";
import _ from "lodash";

import AddSubject from '../Subjects/add_subject';
import Modals from '../../components/feedback/modal';
import ModalStyle, { ModalContent } from '../Feedback/Modal/modal.style';
import WithDirection from '../../config/withDirection';

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


const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);


function callback(key) {}

export default class Subjects extends Component {  
  constructor() {
    super();
    this.state = {
      data: [],
      pages: null,
      loading: true,
      primary_subject:'kannada',
      sidebarOpen: false,
      division_by_mapping_teacher : [],
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

  fetchData(state, instance) {
    // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
    // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
    this.setState({ loading: true });
    // Request the data however you want.  Here, we'll use our mocked service we created earlier
    subjectApi.getSubjects({}).then(res => {
      let pages = 1;
      pages = parseInt(res.data.result.length/5,10);
      this.setState({
          data: res.data.result,
          pages: pages,
          loading: false
      });
    });

    //NEED TO GET THIS FROM REDUX
    teacherApi.getTeachers({}).then(res => {
      let teachers_result = [],division_by_subject = [];
      teachers_result = res.data.result;
      let total_teachers = teachers_result.length;

      let result = _.chain(teachers_result).groupBy("primary_subject").map(function(teachers,primary_subject){
        return [primary_subject,teachers.length]
      }).value()

      let chart_title = [['Primary Subject', 'Teacher']];
      division_by_subject = chart_title.concat(result);

      this.setState({
        division_by_mapping_teacher : division_by_subject,
      });
    });
  }

  componentDidMount(){
    this.fetchData();
  }

  render() {
    const { data, pages, loading , division_by_mapping_teacher} = this.state;
   
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
                    <AddSubject closeModal={this.handleCancel} reload={this.fetchData}/>
                  </p>
                </Modal>

        <Row>
          <Col md={24}>
            <div style={{display:data.length>0?'none':'block'}}>
              <p  style={{padding:'20px',color:'red',fontSize:'25px'}}>
                No subject have been registered kindly click Add New Teacher Button and register the same
              </p>
            </div>

            <Button type="primary" style={{float:'right',marginBottom:'5px'}} onClick={() => this.showModal()}>
                <span style={{display:'inline-block',marginRight:'10px'}}>Add New Subject</span> <i class="ion-ios-plus" style={{fontSize:'20px'}}></i>
            </Button>   
          </Col>
        </Row>

        <Row>
          <Col md={14} sm={24}>  
              <ReactTable
              columns={[
                {
                  Header: "Name",
                  accessor: "name"
                },
                {
                  Header: "Group",
                  accessor: "group"
                },
                {
                  Header: "Active",
                  accessor: "active"
                }
              ]}
              style={{
                height: "420px",
                 // This will force the table body to overflow and scroll, since there is not enough room
              }}
              data={data}
              onFetchData={this.fetchData} // Request new data when things change
              defaultPageSize={7}
              className="-striped -highlight"
              />
          </Col>
          <Col md={10} sm={24}>  
            <Box title="Division of subjects by mapping teacher as their primary subject">
            <Chart
              height={350}
              chartType="ColumnChart"
              loader={<div>Loading Chart</div>}
              data={division_by_mapping_teacher}
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

