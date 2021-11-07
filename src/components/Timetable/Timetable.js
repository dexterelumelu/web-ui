import React from 'react';

import './Timetable.css';

function Event(eventName) {

  return(
    <>
      <div className="event-container">
        <div class="slot slot-1" style={
          { height: '100px' }}
        >
          <div class="event-status">
            <span>Event</span>
          </div>
        </div>
      </div>
    </>
  )
}

function Eventd(eventName) {
  const style = {
    width: 10+'px',
    height: 20+'px',
    gridRow: 10,
    gridColumn: 2
  }
  return(
    <>
      <div className="event-container">
        <div class="slot slot-1" style={style}>
          <div class="event-status">
            <span>Event</span>
          </div>
        </div>
      </div>
    </>
  )
}

function Timetable() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const times = []
  for (let i = 0; i < 15; i++){
    times.push(i+8)
  }
  
  return (
    <>
      <div className='calendar-container'>
        <div className='header'>
          <ul className='weekdays'>
            {days.map((value, index) => {
              return <li key={index}>{value}</li>
            })}
          </ul>
        </div>

        <div className='timeslots-container'>
          <ul class='timeslots'>
            {times.map((value, index) => {
              return <li key={index}>{value}<sup>00</sup></li>
            })}
          </ul>
        </div>
        <Eventd />
        

      </div>
    </>
  )
}

export default Timetable;
