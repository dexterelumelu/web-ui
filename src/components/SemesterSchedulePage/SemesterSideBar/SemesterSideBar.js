import React from 'react';

import './SemesterSideBar.css'


import ListItemButton from '@mui/material/ListItemButton';

//import scheduleData from 'services/data/fallSchedule.json';
import scheduleData from 'services/data/springSchedule.json';
import descriptionData from 'services/data/courseDescriptions.json';
import crnData from 'services/data/springCRN.json';


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

  const displayDescription = (id) => {
    document.getElementById(id).style.display = 'inline-block'
  }

  const collapseDescription = (id) => {
    document.getElementById(id).style.display = 'none'
  }


  const listSubjects = courseList.map((subject) => {
    return(<ListItemButton onClick={() => {onSelectSubject(subject)}}><button className='subject-button'>{subject}</button></ListItemButton>)
  })
  
  const listCourses = classList.map((course, index) => {
    return(
      <>
        <ListItemButton 
          onClick={() => {onSelectCourse(course)}}
          onMouseEnter={() => {displayDescription(subjectList[selectedSubject][course][0]['title'])}}
          onMouseLeave={() => {collapseDescription(subjectList[selectedSubject][course][0]['title'])}}
        >
          <div className='course-button-group'>
            <button 
              className='course-button'
            >
              {course} {subjectList[selectedSubject][course][0]['title']}
            </button>
            <button className='course-button-hide' id={subjectList[selectedSubject][course][0]['title']}>
              {descriptionData[selectedSubject][course]}
            </button>
          </div>
        </ListItemButton>

      </>
      )
  })

  const listSections = (classObject) => {
    return (
      <>
        {classObject.map((section, index) => (
          <div className='section-list-item'>
          <ListItemButton>
            <div className='section-button-group'>
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
              <button className='section-button-info'>
                Credits: {section.credits} <br/>
                Days: {crnData[section.crn]['days'].map((eachDay) => (
                  <pre>      {eachDay}<br/></pre>
                ))}
                Times:<br/>{crnData[section.crn]['times'].map((eachTime) => (
                  <>
                    <pre>      {eachTime}<br/></pre>
                  </>
                ))}
                Instructor: {crnData[section.crn]['instructor']}
              </button>
            </div>
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