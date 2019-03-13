import React, { Component } from 'react'
import moment from 'moment'
import {classApi} from '../../api'
import { Row, Col } from 'antd';
import Button from '../../components/uielements/button';

import { DateRange } from 'react-date-range';
import 'react-dates/lib/css/_datepicker.css';

import Box from '../../components/utility/box';
import ContentHolder from '../../components/utility/contentHolder';


export default class TimeTableFilter extends Component {  
  constructor() {
    super();
    this.state = {
      startDate: moment(),
      endDate: moment(),
      focusedInput: '',
    };
  }

  handleSelect(range){
        console.log(range);
        // An object with two keys,
        // 'startDate' and 'endDate' which are Momentjs objects.
  }

  render() {
    const {startDate , endDate , focusedInput} = this.state;
    

    return (
      
                  <Box>
                    <DateRange
                      onInit={this.handleSelect}
                      onChange={this.handleSelect}
                    />
                  </Box>
    );
  }
}

