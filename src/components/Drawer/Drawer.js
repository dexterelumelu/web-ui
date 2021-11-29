import React, { useState } from 'react';

import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import crnData from 'services/data/springCRN.json';

import './Drawer.css'
//import DrawerButton from './DrawerButton';


function Drawer({ callbackRemoveSection, classScheduleList }) {
  // const drawerList = {...classScheduleList}


  const closeDrawer = () => {
    document.getElementById('drawer-container').style.width='0'
  }

  const updateList = (crn) => {
    callbackRemoveSection(crn);
    console.log('crn', crn);
  }

  return(
    <>
      <div className='drawer-header'>
        <div className='close-button' id='drawer-header' onClick={closeDrawer}>
          &times;
        </div>
      </div>
      <div className='drawer-body'>
        {classScheduleList.map((crn) => {
          if(!(crn in crnData)){
            return(<></>)
          }
          return(
            <>
              <div className='drawer-button-container' >
                <div className='course-key'>
                  {crnData[crn]['subject']} {crnData[crn]['number']}
                </div>

                <div className='course-name'>
                  {crnData[crn]['title']}
                </div>

                <div className='button-exit'>
                  <button onClick={() => {updateList(crn)}}>
                    &times;
                  </button>
                </div>
              </div>
            </>
          )}
        )
        }
      </div>
    </>
  )
}

export default Drawer;