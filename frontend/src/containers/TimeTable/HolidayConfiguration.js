import React, { Component } from 'react'
import moment from 'moment'
import BigCalendar from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'

import { holidayApi } from '../../api'; 
import 'react-big-calendar/lib/addons/dragAndDrop/styles.less'

import Modals from '../../components/feedback/modal';
import ModalStyle, { ModalContent } from '../Feedback/Modal/modal.style';
import WithDirection from '../../config/withDirection';

import AddHoliday from './AddHoliday'
const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer
const DragAndDropCalendar = withDragAndDrop(BigCalendar)


const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);

class HolidayConfiguration extends Component {
  constructor(props) {
    super(props)  
    this.state = {
      holidays : [],
      fetching_holidays : true,
      newHolidayDetails : {}
    }
    this.moveEvent = this.moveEvent.bind(this)
    this.newEvent = this.newEvent.bind(this)
    this.fetchHolidays = this.fetchHolidays.bind(this);
  }

  moveEvent({ event, start, end, isAllDay: droppedOnAllDaySlot }) {
    /*const { events } = this.state

    const idx = events.indexOf(event)
    let allDay = event.allDay

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false
    }

    const updatedEvent = { ...event, start, end, allDay }

    const nextEvents = [...events]
    nextEvents.splice(idx, 1, updatedEvent)

    this.setState({
      events: nextEvents,
    })*/

    // alert(`${event.title} was dropped onto ${updatedEvent.start}`)
  }

  resizeEvent = ({ event, start, end }) => {
    /*const { events } = this.state

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    })

    this.setState({
      events: nextEvents,
    })*/
    //alert(`${event.title} was resized to ${start}-${end}`)
  }

  newEvent(event) {
    this.setState({
      visible: true,
      newHolidayDetails:event,
    });
    // let idList = this.state.events.map(a => a.id)
    // let newId = Math.max(...idList) + 1
    // let hour = {
    //   id: newId,
    //   title: 'New Event',
    //   allDay: event.slots.length == 1,
    //   start: event.start,
    //   end: event.end,
    // }
    // this.setState({
    //   events: this.state.events.concat([hour]),
    // })
  }

  fetchHolidays(state, instance) {
    // Request the data however you want.  Here, we'll use our mocked service we created earlier
    holidayApi.getHolidays({}).then(res => {
      this.setState({
          holidays: res.data.result,
          fetching_holidays: false,
      });
    });
  }

  componentDidMount(){
    this.fetchHolidays();
  }

  handleCloseModal = () => {
    this.setState({ visible: false });
  }

  render() {

    const { holidays , newHolidayDetails } = this.state;

    return (
      <div>
       <Modal
          visible={this.state.visible}
          title="Add Holiday"
          onCancel={this.handleCloseModal}
          >
          <p>
            <AddHoliday holidayDetails= {newHolidayDetails} closeModal={this.handleCloseModal} reload={this.fetchHolidays}/>
          </p>
        </Modal>
        <div className="app" style={{height:'300px'}}>
         <DragAndDropCalendar
          selectable
          localizer={localizer}
          events={holidays}
          onEventDrop={this.moveEvent}
          resizable
          onEventResize={this.resizeEvent}
          onSelectSlot={this.newEvent}
          defaultView={BigCalendar.Views.MONTH}
          defaultDate={new Date()}
          />
        </div>
      </div>
    )
  }
}

export default HolidayConfiguration