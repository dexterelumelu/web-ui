import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import data from 'services/data/fallSchedule.json';
import { yearConstants } from "services/data/yearConstants";

import Navigation from "components/Navbar/Navigation";
import { Col, Container, Row, Card, Button } from "react-bootstrap";
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-react-schedule';
import Timetable from "components/Timetable/Timetable";
import EventTable from "components/EventTable/EventTable";

function App() {
  const yearKey = Object.keys(data)[0];
  console.log(data[yearKey]['AEE'][0]);
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>

      <head>
      </head>
      <body>
        <div className='navbar-container'>
          <ul>
            <li><a class="active" href="#home">Home</a></li>
            <li><a href="#news">News</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#about">About</a></li>
          </ul>
        </div>
        <div className='event-table-container'>
        </div>
      </body>
    </>
  );
}

export default App;
