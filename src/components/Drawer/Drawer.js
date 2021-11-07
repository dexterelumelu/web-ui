import React, { useState } from 'react';

import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';

import './Drawer.css'

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
    <div className='drawer-menu'>
      <div className='drawer-header'>
        <div className='close-button' id='drawer-header' onClick={closeDrawer}>
          &times;
        </div>
      </div>
      <div className='drawer-body'>
        {classScheduleList.map((crn) => (
          <ListItemButton color='black' >
            {crn}
            <button onClick={() => {updateList(crn)}}>
              &times;
            </button>
          </ListItemButton>
        ))
        }
      </div>
    </div>
  )
}

export default Drawer