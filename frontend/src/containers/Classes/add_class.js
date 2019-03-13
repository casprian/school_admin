import React, { Component } from 'react';
import { Input } from 'antd';
import Form from '../../components/uielements/form';
import Card from '../Uielements/Card/card.style';
import Button from '../../components/uielements/button';
import Notification from '../../components/notification';
import {classApi,subjectApi} from '../../api';
import Select, { SelectOption } from '../../components/uielements/select';
import _ from "lodash";

const Option = SelectOption;

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 }
  }
};

const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 14,
          offset: 6
        }
      }
};

class AddClass extends Component {  
  
  constructor() {
      super();
      this.state = {
        subjects : []
      }
      this.fetchData = this.fetchData.bind(this);
  }

  fetchData(state, instance) {
    subjectApi.getSubjects({}).then(res => {
        this.setState({
          subjects : res.data.result,
        });
      });
  }

  componentDidMount(){
      this.fetchData();
  }
  
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        
        let subject_teacher_map = [];
        _.each(values.subjects,function(subject){
          subject_teacher_map.push({
            'subject':subject,
            teacher:''
          });
        });
        
        let subject_teacher_map_prop = {
          'subject_teacher_map':subject_teacher_map,
          'title':values.name+' - '+values.section,
          'id':'id_'+values.name+' - '+values.section
        }

        
        let merged = {...subject_teacher_map_prop, ...values};
        console.log(merged)

        classApi.addClasses(merged).then(res => {
          Notification(
            'success',
            'Added new class'
          );

          this.props.claseModal();
          this.props.reload();
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { subjects } = this.state;
    const subject_options = subjects.map( item => (<Option value={item.name}>{item.name}</Option>));
    

    return (
        <Card title="Add Class">
          <Form onSubmit={this.handleSubmit}>
            
            <FormItem {...formItemLayout} label="Course" hasFeedback>
              {getFieldDecorator('course', {
                rules: [
                {
                  required: true,
                  message: 'Course!'
                }
              ]
            })(<Input name="course" id="course" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="Name" hasFeedback>
              {getFieldDecorator('name', {
                rules: [
                {
                  required: true,
                  message: 'Class Name!'
                }
              ]
            })(<Input name="name" id="name" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="Section" hasFeedback>
              {getFieldDecorator('section', {
                rules: [
                {
                  required: true,
                  message: 'Section Name!'
                }
              ]
            })(<Input name="section" id="section" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="Subjects This Class Teaches" hasFeedback>
              {getFieldDecorator('subjects', {
                rules: [
                {
                  required: true,
                  message: 'Subjects Mapped'
                }
              ]
            })(<Select
                  name="subjects_mapped"
                  mode="multiple"
                >
                  {subject_options}
                </Select>
            )}
            </FormItem>

            <FormItem {...formItemLayout} label="Building Details" hasFeedback>
              {getFieldDecorator('building_details', {
                rules: [
                {
                  required: true,
                  message: 'Building Details !'
                }
              ]
            })(<Input name="building_details" id="building_details" />)}
            </FormItem>


            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register Class
              </Button>
            </FormItem>

          </Form>
        </Card>
    );
  }
}

const WrappedAddTeacher = Form.create()(AddClass);
export default WrappedAddTeacher;