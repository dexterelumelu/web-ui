import React from 'react';
import './EventTable.css';

function Eventd(eventName) {
  const style = {
    gridRow: 2,
    gridColumn: 4 
  }
  return(
    <>
      <div className="event-table-body-content-event">
        <div className="slot" style={style}>
          <div class="event-status">
            <span>Event</span>
          </div>
        </div>
      </div>
    </>
  )
}

function EventTable() {
  const eventList=[]
  const times = []
  for (let i = 0; i < 15; i++){
    times.push(i+8)
  }

  return(
    <>
      <div className='event-table-container'>
        <div className='event-table-header'>
          <ul className='event-table-header-weekdays'>
            <li className='day-header'>Monday</li>
            <li className='day-header'>Tuesday</li>
            <li className='day-header'>Wednesday</li>
            <li className='day-header'>Thursday</li>
            <li className='day-header'>Friday</li>
          </ul>
        </div>
        <div className='event-table-body'>
          <div className='event-table-body-timeslots'>
              {times.map((value, index) => {
                return <li id={index} key={index}>{value}<sup>00</sup></li>
              })}
          </div>
        </div>
        <div className='box'></div>
        <div className='event-table-body-content'>
          <Eventd />
          <Eventd />
        </div>
      </div>
    </>
  );
}

export default EventTable;