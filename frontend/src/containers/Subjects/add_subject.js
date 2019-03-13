import React, { Component } from 'react';
import { Input } from 'antd';
import Form from '../../components/uielements/form';
import Card from '../Uielements/Card/card.style';
import Button from '../../components/uielements/button';
import Notification from '../../components/notification';
import {subjectApi} from '../../api';
import Select, { SelectOption } from '../../components/uielements/select';

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

class AddTeacher extends Component {  
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        subjectApi.addSubject(values).then(res => {
          Notification(
            'success',
            'Added new subject'
          );


          this.props.closeModal();
          this.props.reload();
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <Card title="Add Subject">
          <Form onSubmit={this.handleSubmit}>
            
            <FormItem {...formItemLayout} label="Name" hasFeedback>
              {getFieldDecorator('name', {
                rules: [
                {
                  required: true,
                  message: 'Subject Name!'
                }
              ]
            })(<Input name="name" id="name" />)}
            </FormItem>


            <FormItem {...formItemLayout} label="Group" hasFeedback>
              {getFieldDecorator('group', {
                rules: [
                {
                  required: true,
                  message: 'Subject Group!'
                }
              ]
            })(<Input name="group" id="group" />)}
            </FormItem>


            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register Subject
              </Button>
            </FormItem>

          </Form>
        </Card>
    );
  }
}

const WrappedAddTeacher = Form.create()(AddTeacher);
export default WrappedAddTeacher;