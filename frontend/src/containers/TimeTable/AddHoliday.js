import React, { Component } from 'react';
import { Input } from 'antd';
import Form from '../../components/uielements/form';
import Card from '../Uielements/Card/card.style';
import Button from '../../components/uielements/button';
import Notification from '../../components/notification';
import {holidayApi} from '../../api';
import Select, { SelectOption } from '../../components/uielements/select';
import moment from 'moment'

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

class AddHoliday extends Component {  
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {

        const holiday_details = this.props.holidayDetails;
        
        const newHolidayObject = {
          'title':values.title,
          'start':new moment(holiday_details.start).format(),
          'end':new moment(holiday_details.end).format(),
          'allDay':true
        }

        console.log(newHolidayObject);

        holidayApi.addHoliday(newHolidayObject).then(res => {
          Notification(
            'success',
            'Added new holiday'
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
        <Card title="Add Holiday">
          <Form onSubmit={this.handleSubmit}>
            
            <FormItem {...formItemLayout} label="Title" hasFeedback>
              {getFieldDecorator('title', {
                rules: [
                {
                  required: true,
                  message: 'Holday Occation!'
                }
              ]
            })(<Input name="title" id="title" />)}
            </FormItem>


            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register Holiday
              </Button>
            </FormItem>
          </Form>
        </Card>
    );
  }
}

const WrappedAddHoliday = Form.create()(AddHoliday);
export default WrappedAddHoliday;