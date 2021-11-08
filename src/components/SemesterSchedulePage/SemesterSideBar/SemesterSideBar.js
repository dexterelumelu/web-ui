import React from 'react';

import './SemesterSideBar.css'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Divider from '@mui/material/Divider';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tabs from '@mui/material/Tabs';
import TabPanel from '@mui/lab/TabPanel';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import RestartAltIcon from '@mui/icons-material/RestartAlt'

//import scheduleData from 'services/data/fallSchedule.json';
import scheduleData from 'services/data/springSchedule.json';
import crnData from 'services/data/fallSchedule.json';
import { AppBar } from '@mui/material';


const addedSections = new Set()

const yearKey = Object.keys(scheduleData)[0]; 
const subjectList = scheduleData[yearKey]; // Dict -> key=subject
const courseList = Object.keys(subjectList) // list of subjects







function SemesterSideBar({ callbackHoverSection, callbackAddSection }) {
  const [pageRank, setPageRank] = React.useState(1);

  const [classList, setClassList] = React.useState(Object.keys(subjectList['AEE']))
  const [sectionList, setSectionList] = React.useState(subjectList['AEE']['1201'])
  const crnList = []
  //console.log('section list', subjectList['AEE']['1201']);

  const [selectedSubject, setSelectedSubject] = React.useState('AEE');
  const [selectedCourse, setSelectedCourse] = React.useState('1201');
  const [selectedSection, setSelectedSection] = React.useState('0');

  const [activeHeader, setActiveHeader] = '1'

  
  const onSelectSubject = (subject) => {
    setSelectedSubject(subject)
    setClassList(Object.keys(subjectList[subject]))
    setPageRank(2)
  }

  const onSelectCourse = (course) => {
    setSelectedCourse(course)
    setSectionList(subjectList[selectedSubject][course])
    setPageRank(3)
  }

  const onSelectSection = (section) => {
    addedSections.add(section.crn)
    setPageRank(1)
  }


  const listSubjects = courseList.map((subject) => {
    return(<ListItemButton onClick={() => {onSelectSubject(subject)}}><button className='subject-button'>{subject}</button></ListItemButton>)
  })
  
  const listCourses = classList.map((course, index) => {
    console.log('classlist', selectedSubject)
    return(<ListItemButton onClick={() => {onSelectCourse(course)}}><button className='course-button'>{course} {subjectList[selectedSubject][course][0]['title']}</button></ListItemButton>)
  })

  const listSections = (classObject) => {
    return (
      <>
        {classObject.map((section, index) => (
          <div className='section-list-item'>
          <ListItemButton>
            <button className='section-button'
              onClick={() => {
                callbackHoverSection(0)
                callbackAddSection(section.crn)
                onSelectSection(section)
              }}
              onMouseEnter={() => {
                callbackHoverSection(0)
                callbackHoverSection(section.crn)
              }}
              onMouseLeave={() => {callbackHoverSection(0)}}
            >
            {section.crn}  {section.title}
            </button>
            </ListItemButton>
          </div>           
        ))
        }
      </>
    )
  }

  //return(<ListItemButton onClick={() => {onSelectSection(value)}}>{sectionList[value]}</ListItemButton>)
  //return(<ListItemButton onClick={() => {onSelectSection(section)}}>{subjectList[selectedSubject][selectedCourse][{section}]['crn']}</ListItemButton>)
  
  
  const displayPage = () => {
    if (pageRank === 1) {
      return (
        <> {listSubjects} </>
      )
    }else if(pageRank === 2){
      return (
        <> {listCourses} </>
      )
    }else if(pageRank === 3){

      //console.log('selected subject', selectedSubject)
      //console.log('selected subject', selectedCourse)
      //console.log('selected subject', selectedSection)
      const courseObject = subjectList[selectedSubject][selectedCourse]
      //console.log(subjectList[selectedSubject][selectedCourse][selectedSection]['title'])
      return (
        <> {listSections(courseObject)} </>
      )
    }else{
      console.log('pr', pageRank)
      return (
        <> OMO NA ERROR O </>
      )
    }
  }

  const onBackClick = () => {
    if (pageRank > 1){
      setPageRank(pageRank-1)
    }
  }

  const onResetClick = () => {
    if (pageRank !== 0) {
      setPageRank(1)
    }
  }

  const handlePageChange = (event, newValue) => {
    setPageRank(newValue)
    console.log('newValue: ', pageRank)
  }

  return(
    <>
      <div className='sidebar-wrapper'>
        <div className='card-header'>
            <button className='card-header-button' onClick={onBackClick}>&lt;</button>
            <button className='card-header-tab1'>SUBJECT</button>
            <button className='card-header-tab2'>COURSE</button>
            <button className='card-header-tab3'>SECTION</button>
            <button className='card-header-button' onClick={onResetClick}>&#8635;</button>
        </div>
        <div className='card-body'>
          {/*<Box sx={{ height:'100%', width: '100%', typography: 'body1', bgcolor: 'pink' }}>*/}
            <div className='card-body-list'>
              {displayPage()}
            </div>
          {/*</Box>*/}
        </div>
      </div>
    </>
  )
}

export default SemesterSideBar;