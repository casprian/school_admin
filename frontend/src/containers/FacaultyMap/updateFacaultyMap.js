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

const Option = SelectOption;

let teacher_subject_mapping_object = {},teacher_subject_mapping_array = [], touched_subjects = [];
   

export default class UpdateFacaultyMap extends Component {  

  constructor() {
    super();
    this.state = {
      classes: [],
      teacher_subject_map : [],
    };
    this.fetchData = this.fetchData.bind(this);
    this.submit_updates = this.submit_updates.bind(this);
  }

  fetchData(state, instance) {
    classApi.getClasses({_id:this.props.classid}).then(res => {
      let pages = 1;
      this.setState({
          classes: res.data.result
      });
    });
  }

  componentDidMount(){
    this.fetchData();
  }

  componentDidUpdate(nextProps) {
    if(JSON.stringify(this.props.classid) !== JSON.stringify(nextProps.classid)) {
           this.fetchData();
    }
  }

  submit_updates(){
  
    classApi.updateClass({
      'class_id':this.props.classid,
      'subject_teacher_map':this.state.teacher_subject_map
      }).then(res => {
        this.props.cancel();
        this.props.reload();
    });
  }

  updateTeacherSelection(subject,teacher){
    teacher_subject_mapping_object = {
        'subject':subject,
        'teacher':{
          'id':teacher._id,
          'name':teacher.last_name+','+teacher.first_name
        }
    }

    if(touched_subjects.indexOf(subject) == -1){
      touched_subjects.push(subject);
      teacher_subject_mapping_array.push(teacher_subject_mapping_object);
    } else {
      let index = _.findIndex(teacher_subject_mapping_array, {'subject':subject});
      teacher_subject_mapping_array.splice(index, 1, teacher_subject_mapping_object);
    }

    this.setState({
      teacher_subject_map:teacher_subject_mapping_array
    })
  }

  render() {
    const {teachers} = this.props;
    const {classes , teacher_subject_map} = this.state;
    return (
        <p style={{height:'350px'}}>
          {classes.map((obj, i) => 
          <div className='SimpleTable'>
            <table>
            <tr>
              <td>Subject</td>
              <td>Existing Teacher</td>
              <td>Update To</td>
            </tr>
              {obj.subject_teacher_map.map((obj, i) => 
              <tr>
                <td>{obj.subject}</td>
                <td>
                  {obj.teacher.name}  
                </td>

                <td>
                  <Select style={{width:'150px'}} onChange={(e) => this.updateTeacherSelection(obj.subject,e)}>
                    {teachers.map((obj,i)=><Option key={i} value={obj}>{obj.last_name},{obj.first_name}</Option>)}
                  </Select>
                </td>

            </tr> 
            )}
            </table>
            </div>)}  
            <Button type='primary' style={{float:'right'}} disabled={teacher_subject_map.length == 0} onClick={this.submit_updates}>Submit Updates </Button>
          
        </p>


    );
  }
}

