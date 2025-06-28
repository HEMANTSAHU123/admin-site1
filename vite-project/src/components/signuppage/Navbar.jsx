import React from 'react';
import { Navbar, Nav, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MyNavbar = () => {
  return (
    <Navbar>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
       <h2>welcome to travelling App</h2>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;