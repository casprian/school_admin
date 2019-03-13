import React, { Component } from 'react';
import { Input } from 'antd';
import Form from '../../components/uielements/form';
import Card from '../Uielements/Card/card.style';
import Button from '../../components/uielements/button';
import Notification from '../../components/notification';
import {teacherApi} from '../../api';
import Select, { SelectOption } from '../../components/uielements/select';
import {subjectApi} from '../../api';

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

  constructor() {
      super();
      this.state = {
        subjects : []
      }
      this.fetchData = this.fetchData.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        teacherApi.addTeacher(values).then(res => {
          Notification(
            'success',
            'Added new teacher'
          );
          this.props.claseModal();
          this.props.reload();
          //this.setState({ sidebarOpen: false });
        });
      }
    });
  };

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

  render() {
    const { getFieldDecorator } = this.props.form;
    const { subjects } = this.state;
    const subject_options = subjects.map( item => (<Option value={item.name}>{item.name}</Option>));
    
    console.log(subjects);

    return (
        <Card title="Add Teacher">
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="First Name" hasFeedback>
              {getFieldDecorator('first_name', {
                rules: [
                {
                  required: true,
                  message: 'Please input your Name!'
                }
              ]
            })(<Input name="first_name" id="first_name" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="Last Name" hasFeedback>
              {getFieldDecorator('last_name', {
                rules: [
                {
                  required: true,
                  message: 'Please input your Name!'
                }
              ]
            })(<Input name="last_name" id="last_name" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="E-mail" hasFeedback>
              {getFieldDecorator('email', {
                rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!'
                },
                {
                  required: true,
                  message: 'Please input your E-mail!'
                }
              ]
              })(<Input name="email" id="email" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="Mobile Number" hasFeedback>
              {getFieldDecorator('mobile_number', {
                rules: [
                {
                  required: true,
                  message: 'Please input your Mobile Number!'
                }
              ]
            })(<Input name="mobile_number" id="mobile_number" />)}
            </FormItem>

              <FormItem {...formItemLayout} label="Primary Subject" hasFeedback>
                {getFieldDecorator('primary_subject', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your Primary Subject!'
                    }
                  ]
                })(
                <Select
                  mode="single"
                  name="primary_subject"
                >
                  {subject_options}
                </Select>
              )}
            </FormItem>

             
              <FormItem {...formItemLayout} label="Other Subjects" hasFeedback>
                {getFieldDecorator('other_subjects', {
                  rules: [
                  {
                    required: true,
                    message: 'Please input your Other Subject!'
                  }
                ]
              })(<Select
                  mode="multiple"
                  name="other_subjects"
                >
                  {subject_options}
                </Select>)}
            </FormItem>

            <FormItem {...formItemLayout} label="Highest Qualification" hasFeedback>
                {getFieldDecorator('highest_qualification', {
                  rules: [
                  {
                    required: true,
                    message: 'Please input your Highest Qualifiation!'
                  }
                ]
              })(<Select
                  name="highest_qualification"
                  
                >
                  
                  <Option value='Bachelor of Agriculture (B.Sc. (Agriculture))'>Bachelor of Agriculture (B.Sc. (Agriculture))</Option>
                     <Option value='Bachelor of Architecture (B.Arch.)'>Bachelor of Architecture (B.Arch.)</Option>
                     <Option value='Bachelor of Arts (B.A.)'>Bachelor of Arts (B.A.)</Option>
                     <Option value='Bachelor of Ayurvedic Medicine & Surgery (B.A.M.S.)'>Bachelor of Ayurvedic Medicine & Surgery (B.A.M.S.)</Option>
                     <Option value='Bachelor of Business Administration (B.B.A.)'>Bachelor of Business Administration (B.B.A.)</Option>
                     <Option value='Bachelor of Commerce (B.Com.)'>Bachelor of Commerce (B.Com.)</Option>
                     <Option value='Bachelor of Computer Applications (B.C.A.)'>Bachelor of Computer Applications (B.C.A.)</Option>
                     <Option value='Bachelor of Computer Science (B.Sc. (Computer Science))'>Bachelor of Computer Science (B.Sc. (Computer Science))</Option>
                     <Option value='Bachelor of Dental Surgery (B.D.S.)'>Bachelor of Dental Surgery (B.D.S.)</Option>
                     <Option value='Bachelor of Design (B.Des. -  B.D.)'>Bachelor of Design (B.Des. -  B.D.)</Option>
                     <Option value='Bachelor of Education (B.Ed.)'>Bachelor of Education (B.Ed.)</Option>
                     <Option value='Bachelor of Engineering - Bachelor of Technology (B.E./B.Tech.)'>Bachelor of Engineering - Bachelor of Technology (B.E./B.Tech.)</Option>
                     <Option value='Bachelor of Fine Arts (BFA - BVA)'>Bachelor of Fine Arts (BFA - BVA)</Option>
                     <Option value='Bachelor of Fisheries Science (B.F.Sc. - B.Sc. (Fisheries))'>Bachelor of Fisheries Science (B.F.Sc. - B.Sc. (Fisheries))</Option>
                     <Option value='Bachelor of Home Science (B.A. - B.Sc. (Home Science))'>Bachelor of Home Science (B.A. - B.Sc. (Home Science))</Option>
                     <Option value='Bachelor of Homeopathic Medicine and Surgery (B.H.M.S.)'>Bachelor of Homeopathic Medicine and Surgery (B.H.M.S.)</Option>
                     <Option value='Bachelor of Laws (L.L.B.)'>Bachelor of Laws (L.L.B.)</Option>
                     <Option value='Bachelor of Library Science (B.Lib. - B.Lib.Sc.)'>Bachelor of Library Science (B.Lib. - B.Lib.Sc.)</Option>
                     <Option value='Bachelor of Mass Communications (B.M.C. - B.M.M.)'>Bachelor of Mass Communications (B.M.C. - B.M.M.)</Option>
                     <Option value='Bachelor of Medicine and Bachelor of Surgery (M.B.B.S.)'>Bachelor of Medicine and Bachelor of Surgery (M.B.B.S.)</Option>
                     <Option value='Bachelor of Nursing (B.Sc. (Nursing))'>Bachelor of Nursing (B.Sc. (Nursing))</Option>
                     <Option value='Bachelor of Pharmacy (B.Pharm.)'>Bachelor of Pharmacy (B.Pharm.)</Option>
                     <Option value='Bachelor of Physical Education (B.P.Ed.)'>Bachelor of Physical Education (B.P.Ed.)</Option>
                     <Option value='Bachelor of Physiotherapy (B.P.T.)'>Bachelor of Physiotherapy (B.P.T.)</Option>
                     <Option value='Bachelor of Science (B.Sc.)'>Bachelor of Science (B.Sc.)</Option>
                     <Option value='Bachelor of Social Work (BSW or B.A. (SW))'>Bachelor of Social Work (BSW or B.A. (SW))</Option>
                     <Option value='Bachelor of Veterinary Science & Animal Husbandry (B.V.Sc.)'>Bachelor of Veterinary Science & Animal Husbandry (B.V.Sc.)</Option>
                     <Option value='Doctor of Medicine (M.D.)'>Doctor of Medicine (M.D.)</Option>
                     <Option value='Doctor of Medicine in Homoeopathy (M.D. (Homoeopathy))'>Doctor of Medicine in Homoeopathy (M.D. (Homoeopathy))</Option>
                     <Option value='Master in Home Science (M.A. - M.Sc. (Home Science))'>Master in Home Science (M.A. - M.Sc. (Home Science))</Option>
                     <Option value='Master of Architecture (M.Arch.)'>Master of Architecture (M.Arch.)</Option>
                     <Option value='Master of Arts (M.A.)'>Master of Arts (M.A.)</Option>
                     <Option value='Master of Business Administration (M.B.A.)'>Master of Business Administration (M.B.A.)</Option>
                     <Option value='Master of Chirurgiae (M.Ch.)'>Master of Chirurgiae (M.Ch.)</Option>
                     <Option value='Master of Commerce (M.Com.)'>Master of Commerce (M.Com.)</Option>
                     <Option value='Master of Computer Applications (M.C.A.)'>Master of Computer Applications (M.C.A.)</Option>
                     <Option value='Master of Dental Surgery (M.D.S.)'>Master of Dental Surgery (M.D.S.)</Option>
                     <Option value='Master of Design (M.Des. -  M.Design.)'>Master of Design (M.Des. -  M.Design.)</Option>
                     <Option value='Master of Education (M.Ed.)'>Master of Education (M.Ed.)</Option>
                     <Option value='Master of Engineering - Master of Technology (M.E./M.Tech.)'>Master of Engineering - Master of Technology (M.E./M.Tech.)</Option>
                     <Option value='Master of Fine Arts (MFA - MVA)'>Master of Fine Arts (MFA - MVA)</Option>
                     <Option value='Master of Fishery Science (M.F.Sc. - M.Sc. (Fisheries))'>Master of Fishery Science (M.F.Sc. - M.Sc. (Fisheries))</Option>
                     <Option value='Master of Laws (L.L.M.)'>Master of Laws (L.L.M.)</Option>
                     <Option value='Master of Library Science (M.Lib. - M.Lib.Sc.)'>Master of Library Science (M.Lib. - M.Lib.Sc.)</Option>
                     <Option value='Master of Mass Communications (M.M.C - M.M.M.)'>Master of Mass Communications (M.M.C - M.M.M.)</Option>
                     <Option value='Master of Pharmacy (M.Pharm)'>Master of Pharmacy (M.Pharm)</Option>
                     <Option value='Master of Philosophy (M.Phil.)'>Master of Philosophy (M.Phil.)</Option>
                     <Option value='Master of Physical Education (M.P.Ed. -  M.P.E.)'>Master of Physical Education (M.P.Ed. -  M.P.E.)</Option>
                     <Option value='Master of Physiotherapy (M.P.T.)'>Master of Physiotherapy (M.P.T.)</Option>
                     <Option value='Master of Science (M.Sc.)'>Master of Science (M.Sc.)</Option>
                     <Option value='Master of Science in Agriculture (M.Sc. (Agriculture))'>Master of Science in Agriculture (M.Sc. (Agriculture))</Option>
                     <Option value='Master of Social Work (M.S.W. or M.A. (SW))'>Master of Social Work (M.S.W. or M.A. (SW))</Option>
                     <Option value='Master of Surgery (M.S.)'>Master of Surgery (M.S.)</Option>
                     <Option value='Master of Veterinary Science (M.V.Sc.)'>Master of Veterinary Science (M.V.Sc.)</Option>
                     <Option value='Doctor of Pharmacy (Pharm.D)'>Doctor of Pharmacy (Pharm.D)</Option>
                     <Option value='Doctor of Philosophy (Ph.D.)'>Doctor of Philosophy (Ph.D.)</Option>
                     <Option value='Doctorate of Medicine (D.M.)'>Doctorate of Medicine (D.M.)</Option>
                     <Option value='Bachelor Degree'>Bachelor Degree</Option>
                </Select>)}
            </FormItem>

            <FormItem {...formItemLayout} label="Description" hasFeedback>
              {getFieldDecorator('description', {
                rules: [
                {
                  required: true,
                  message: 'Description '
                }
              ]
            })(<Input type="textarea" name="description" id="description" />)}
            </FormItem>

            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register Teacher
              </Button>
            </FormItem>

          </Form>


        </Card>
    );
  }
}

const WrappedAddTeacher = Form.create()(AddTeacher);
export default WrappedAddTeacher;