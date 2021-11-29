import React from 'react';

import './DrawerButton.css';


function DrawerButton({ callbackRemoveSection, courseName, courseKey }){
  return(
    <>
      <div className='drawer-button-container'>
        <div className='course-key'>
          cse 1002
        </div>

        <div className='course-name'>
          fundamentals of swe
        </div>

        <div className='button-exit'>
          <button>
            &times;
          </button>
        </div>
      </div>
    </>
  )
}

export default DrawerButton;