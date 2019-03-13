import React, { Component } from 'react';
import clone from 'clone';
import { Row, Col } from 'antd';
import Button from '../../components/uielements/button';
import Card from '../Uielements/Card/card.style';
import userpic from '../../image/user1.png';
import {classApi,teacherApi} from '../../api';
import _ from "lodash";
import Select, { SelectOption } from '../../components/uielements/select';
import './table_styling.less';
import Modals from '../../components/feedback/modal';
import ModalStyle, { ModalContent } from '../Feedback/Modal/modal.style';
import WithDirection from '../../config/withDirection';
import UpdateFacaultyMap from './updateFacaultyMap'

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);
const confirm = Modals.confirm;

const Option = SelectOption;
export default class FacaultyMap extends Component {  
  constructor() {
    super();
    this.state = {
      classes: [],
      teachers:[],
      loading: false,
      visible: false,
      selected_class_id : '',
    };
    this.fetchData = this.fetchData.bind(this);
  }

  showModal = (id) => {
    this.setState({
      visible: true,
      selected_class_id : id,
    });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  fetchData(state, instance) {
    classApi.getClasses({}).then(res => {
      let pages = 1;
      pages = parseInt(res.data.result.length/5,10);
      this.setState({
          classes: res.data.result
      });
    });

    teacherApi.getTeachers({}).then(res => {
      this.setState({
        teachers : res.data.result,
      });
    });
  }

  componentDidMount(){
    this.fetchData();
  }

  render() {
    const { classes ,teachers , selected_class_id } = this.state;
  
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
                    <UpdateFacaultyMap reload={this.fetchData} cancel={this.handleCancel} teachers={this.state.teachers} classid={this.state.selected_class_id}>
                    </UpdateFacaultyMap>
                  </p>
                </Modal>

        <Row>
            {classes.map((obj, i) => <Col md={8} sm={24} key={i} style={{ padding: '0 10px' }}> 
              <Card title={'Course - '+ obj.course+' , Class - ' + obj.name + ' , Section ' + obj.section.toUpperCase()}>
                <div className='SimpleTable'>
                <a type="primary" style={{float:'right'}} onClick={() => this.showModal(obj._id)}>Edit <i className="ion-edit" style={{fontSize:'20px'}}></i></a>
                                      
                <table>
                <tbody>
                    <tr><td><span>Subject</span></td>
                        <td><span>Assigned Teacher </span></td></tr>
                      {obj.subject_teacher_map.map((obj, i) => 
                      <tr key={i}><td>{obj.subject}</td>
                        <td>
                       
                        {obj.teacher.name}  
                      </td>
                      </tr> 
                )}
                </tbody>
                </table>
                </div>
              </Card>
            </Col>)} 
        </Row>
      </div>
    );
  }
}

