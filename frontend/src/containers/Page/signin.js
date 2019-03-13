import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '../../components/uielements/input';
import Checkbox from '../../components/uielements/checkbox';
import Button from '../../components/uielements/button';
import authAction from '../../redux/auth/actions';
import IntlMessages from '../../components/utility/intlMessages';
import SignInStyleWrapper from './signin.style';
import {reactLocalStorage} from 'reactjs-localstorage';
import {loginApi} from '../../api';
import Form from '../../components/uielements/form';
import Notification from '../../components/notification';

import Card from '../Uielements/Card/card.style';
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

const { login } = authAction;

class SignIn extends Component {
  state = {
    redirectToReferrer: false,
    selectedSchool : '',
  };
  
  componentDidMount () {
    if(reactLocalStorage.get('school_name')){
      this.setState({ selectedSchool: reactLocalStorage.get('school_name')});  
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }

  saveSelectedSchool = (school_name) => {
    reactLocalStorage.set('school_name', school_name);
    this.setState({ selectedSchool:school_name});
  }

  handleSubmit = e => {
    let school_name = this.state.selectedSchool;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let school_obj  = {
          "school_name" :school_name
        }
        const login_object = Object.assign({}, school_obj, values);
        loginApi.login(login_object).then(res => {
          console.log(res)
          if(res.data.message == 'success'){
            this.props.history.push('/dashboard');
            Notification(
              'info',
              'Welcome dear Principal',
            );  
          } else {
            Notification(
              'error',
               res.data.message,
            ); 
          }        
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const from = { pathname: '/dashboard' };
    const { redirectToReferrer , selectedSchool} = this.state;
    let school_selected = false;
    if(selectedSchool != ''){
      school_selected = true;
    }
    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">
              <Link to="/dashboard">
                 Logic 30 - Client
              </Link>
            </div>
            <h2>Login in to {selectedSchool} </h2>
            <div className="isoSignInForm">
             
             <div style={{display:school_selected ? 'none':'block'}}>
                <Button type="primary"  onClick={() => this.saveSelectedSchool('HUDA')}>
                    Huda School
                </Button>
                <Button type="primary"  onClick={() => this.saveSelectedSchool('united Academy')}>
                    United Academy
                </Button>
                <Button type="primary" onClick={() => this.saveSelectedSchool('Aravinda')}>
                    Aravinda
                </Button>
              </div>

              <div style={{display:school_selected ? 'block':'none'}}>
                
                  <Card title="Login">
                                  <Form onSubmit={this.handleSubmit}>
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

                                    <FormItem {...formItemLayout} label="password" hasFeedback>
                                      {getFieldDecorator('password', {
                                        rules: [
                                        {
                                          required: true,
                                          message: 'password pleasde'
                                        }
                                      ]
                                      })(<Input name="password" type="password" id="password" />)}
                                    </FormItem>

                                    <FormItem {...tailFormItemLayout}>
                                      <Button type="primary" htmlType="submit">
                                        Login
                                      </Button>
                                    </FormItem>
                                  </Form>
                            </Card>
              </div>

            </div>
          </div>
        </div>
      </SignInStyleWrapper>
    );
  }
}

const WrappedSignIn = Form.create()(SignIn);
export default WrappedSignIn;