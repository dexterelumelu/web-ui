import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//import { Navbar, Nav, Form, FormControl, Button, NavItem } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

function Navigation() {
  const [click, setClick] = useState(false)
  

  return (
    <>
      <div className='navBar'>
        <Navbar bg='dark' variant='dark'>
            <Navbar.Brand>Page Title</Navbar.Brand>
        </Navbar>
      </div>
    </>
  )
}

export default Navigation;
