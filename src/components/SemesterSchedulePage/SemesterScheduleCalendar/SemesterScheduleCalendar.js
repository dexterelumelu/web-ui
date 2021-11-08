import React from 'react';
import './SemesterScheduleCalendar.css'

import crnData from 'services/data/springCRN.json';
//import crnData from 'services/data/fallCRN.json';

import { duration } from '@mui/material';


const parseClassScheduleList = (crn) => {
  // get each crn and check if crn has times
  if (crn in crnData){
    // collect section information
    const section = crnData[crn]
    //array to contain details to use and make div
    const dayList = []

    // column values by day
    const dayCols = {'M': 2, 'T': 3, 'W': 4, 'R': 5, 'F': 6, 'S':7}
    
    var tempStart = {'M': 0, 'T': 0, 'W': 0, 'R': 0, 'F': 0, 'S':0}
    var tempEnd = {'M': 0, 'T': 0, 'W': 0, 'R': 0, 'F': 0, 'S':0}

    //['mwf', 's'] ['1500-1700', '1000 - 1300']
    for (var row = 0; row < section['days'].length; row++){
      for (var col = 0; col < section['days'][row].length; col++) {
        const dayOfWeek = section['days'][row].charAt(col)
        const timeArray = section['times'][row].split('-')
        const startTime = ((((timeArray[0].substring(0,2)-8) * 12) + 1) + (timeArray[0].substring(2,4) / 5)) // + (timeArray[0].substring(2,4)/5))
        const endTime = ((((timeArray[1].substring(0,2)-8) * 12) + 1) + (timeArray[1].substring(2,4) / 5)) // + (timeArray[0].substring(2,4)/5))
                
        const dayDiv = {
          column: dayCols[dayOfWeek],
          start: startTime,
          end: endTime
        }
        dayList.push(<div className='item-column-add' style={{ gridRowStart: dayDiv.start, gridRowEnd: dayDiv.end, gridColumn: dayDiv.column }}>{section['title']}</div>)
      }
    }
    // array, for each day of a section
    return(
      <>
        {dayList.map((childDiv) => (
          childDiv
        ))}
      </>
    )
  } else{
    return (<></>)
  }
}

const times = []


function SemesterScheduleCalendar({ hoverSection, classScheduleList }) {

  const onHoverSection = (crn) => {
    // to rewrite
    if (crnData[crn] == undefined){
      return(<></>)
    }
    const dayCols = {'M': 2, 'T': 3, 'W': 4, 'R': 5, 'F': 6, 'S':7}
    // console.log('hoverSection', crnData[crn])
    const section = crnData[crn]
    const dayList = []
    var tempStart = {'M': 0, 'T': 0, 'W': 0, 'R': 0, 'F': 0, 'S':0}
    var tempEnd = {'M': 0, 'T': 0, 'W': 0, 'R': 0, 'F': 0, 'S':0}
    
    for (var i = 0; i < section['days'][0].length; i++) {
      const columnDisplay = dayCols[i]
      const timeArray = section['times'][0].split('-')
      const startTime = ((((timeArray[0].substring(0,2)-8) * 12) + 1) + (timeArray[0].substring(2,4) / 5)) // + (timeArray[0].substring(2,4)/5))
      const hourDuration = timeArray[1].substring(0,2) - timeArray[0].substring(0,2)
      const timeDuration = ((60 * Number(timeArray[1].substring(0,2))) + Number(timeArray[1].substring(2,4))) - ((60 * Number(timeArray[0].substring(0,2))) + Number(timeArray[0].substring(2,4)))
      const timeRowSpan = timeDuration / 5
      tempStart[section['days'][0].charAt(i)] = startTime
      tempEnd[section['days'][0].charAt(i)] = startTime + timeRowSpan
      //console.log('qm', (60 * timeArray[1].substring(0,2)) + timeArray[1].substring(2,4))
      //console.log('temp', tempEnd[section['days'][0].charAt(i)], 'startTime', startTime, 'last', timeRowSpan, 'ts', tempStart['T'], 'tE', tempEnd['M'])
      const dayDiv = {
        col: dayCols[section['days'][0].charAt(i)],
        start: startTime,
        end: startTime+timeRowSpan
      }
      dayList.push(dayDiv)
    };

    if (crn === 0){
      tempStart = {'M': 0, 'T': 0, 'W': 0, 'R': 0, 'F': 0, 'S':0}
      tempEnd = {'M': 0, 'T': 0, 'W': 0, 'R': 0, 'F': 0, 'S':0}
    }else if (crn !== 0) {
      return(
        <>
          {dayList.map((value, index) => (
            <div className='item-column-hover' style={{ gridRow: value.start+'/'+value.end, gridColumn: value.col }} >{crn + ' ' + crnData[crn]['subject'] + '  ' + crnData[crn]['number']}</div>
          ))
          }
        </>
      )

    }else{
      return(<></>)
    }
  }

  const displayClassScheduleList = () => {
    if (classScheduleList.size == 0){
      return(<></>)
    }else{
      return(
        <>
        {classScheduleList.map((parent) => (
          <>
          {parseClassScheduleList(parent)}
          </>
        ))
        }
      </>
      )
    }
  }

  for (let i = 0; i < 15; i++){
    times.push(i)
  }
  return(
    <>
      <div className='calendar-container'>
        <div className='calendar-header'>
          <div className='weekday-headers'>
            <div className='blank-column'></div>
            <div className='weekday-column'>Monday</div>
            <div className='weekday-column'>Tuesday</div>
            <div className='weekday-column'>Wednesday</div>
            <div className='weekday-column'>Thursday</div>
            <div className='weekday-column'>Friday</div>
            <div className='weekday-column'>Saturday</div>
          </div>
        </div>
        <div className='calendar-body'>
          <div className='weekday-content'>
            <div className='hour-rows' style={{gridRow: 1, gridColumn: 1}}>8<sup>am</sup></div>
            <div className='hour-rows' style={{gridRow: 13, gridColumn: 1}}>9<sup>am</sup></div>
            <div className='hour-rows' style={{gridRow: 25, gridColumn: 1}}>10<sup>am</sup></div>
            <div className='hour-rows' style={{gridRow: 37, gridColumn: 1}}>11<sup>am</sup></div>
            <div className='hour-rows' style={{gridRow: 49, gridColumn: 1}}>12<sup>pm</sup></div>
            <div className='hour-rows' style={{gridRow: 61, gridColumn: 1}}>1<sup>pm</sup></div>
            <div className='hour-rows' style={{gridRow: 73, gridColumn: 1}}>2<sup>pm</sup></div>
            <div className='hour-rows' style={{gridRow: 85, gridColumn: 1}}>3<sup>pm</sup></div>
            <div className='hour-rows' style={{gridRow: 97, gridColumn: 1}}>4<sup>pm</sup></div>
            <div className='hour-rows' style={{gridRow: 109, gridColumn: 1}}>5<sup>pm</sup></div>
            <div className='hour-rows' style={{gridRow: 121, gridColumn: 1}}>6<sup>pm</sup></div>
            <div className='hour-rows' style={{gridRow: 133, gridColumn: 1}}>7<sup>pm</sup></div>
            <div className='hour-rows' style={{gridRow: 145, gridColumn: 1}}>8<sup>pm</sup></div>
            <div className='hour-rows' style={{gridRow: 157, gridColumn: 1}}>9<sup>pm</sup></div>
            <div className='hour-rows' style={{gridRow: 169, gridColumn: 1}}>10<sup>pm</sup></div>
            <div className='hour-rows' style={{gridRow: 181, gridColumn: 1}}>11<sup>pm</sup></div>

            <div className='hour-borders' style={{gridRow: '1/-1', gridColumn: 2}}></div>
            <div className='hour-borders' style={{gridRow: '1/-1', gridColumn: 4}}></div>
            <div className='hour-borders' style={{gridRow: '1/-1', gridColumn: 6}}></div>

            {onHoverSection(hoverSection)}
            {displayClassScheduleList(classScheduleList)}
          </div>
        </div>
      </div>
    </>
  );
}

export default SemesterScheduleCalendar;