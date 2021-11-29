import React, { useState } from 'react';

import './CourseSchedule.css'

import SemesterSideBar from 'components/SemesterSchedulePage/SemesterSideBar/SemesterSideBar.js';
import SemesterScheduleCalendar from 'components/SemesterSchedulePage/SemesterScheduleCalendar/SemesterScheduleCalendar.js';
import Drawer from 'components/Drawer/Drawer';

import crnData from 'services/data/springCRN.json';


function CourseSchedule() {

  const [hoverSection, setHoverSection] = useState(0);
  const [lastSectionAdded, setLastSectionAdded] = useState(0);
  const [classScheduleList, setClassScheduleList] = useState([])
  const [creditsCount, setCreditsCount] = useState(0)

  const countCredits = () => {
    classScheduleList.forEach(crn => {
      if (crnData[crn]['credits'] !== undefined){
        const numCredits = crnData[crn]['credits']
        setCreditsCount(Number(numCredits) + creditsCount)
      }
    })
  }

  const openDrawer = () => {
    document.getElementById('drawer-container').style.width='30%'
  }

  const callbackHoverSection = (crn) => {
    setHoverSection(crn)
  }

  const callbackAddSection = (crn) => {
    /*classScheduleList.forEach(scheduleCRN => {
      const existingTimes = []
    });*/
    setLastSectionAdded(crn)
    if (!classScheduleList.includes(crn)){
      setClassScheduleList(prevItems => [...prevItems, crn])
    }
  }

  const callbackRemoveSection = (crn) => {
    setClassScheduleList(classScheduleList.filter(item => item !== crn))
  }

  const callbackClearCalendar = () => {
    classScheduleList([])
  }


  return(
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>

      <head>
      </head>
      <body>
        <div>
          <div className='drawer-open' onClick={openDrawer}>&#9776;</div>
          <div className='drawer-container' id='drawer-container'>  
            <Drawer classScheduleList={classScheduleList} callbackRemoveSection={callbackRemoveSection}/>
          </div>
        </div>
        <div className='semester-schedule-container'>
          <div className='navbar-container'>
            <button>HOME</button>
          </div>
          <div className='sidebar-container'>
            <SemesterSideBar callbackHoverSection={callbackHoverSection} callbackAddSection={callbackAddSection} />
          </div>
          <div className='event-table-container'>
            <SemesterScheduleCalendar hoverSection={hoverSection} classScheduleList={classScheduleList}/>
          </div>
        </div>
      </body>
    </>
  );
}

export default CourseSchedule;