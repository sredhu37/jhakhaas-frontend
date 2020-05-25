import React from 'react';
import { Navbar, Nav, Form, Image } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import personPic from '../static/nopic.png';

const NavBar = (props) => {
  const history = useHistory();

  const handleLogout = (event) => {
    event.preventDefault();
    // remove jwtToken from localStorage
    localStorage.removeItem('jwt');

    // set isLoggedIn to false
    props.setIsLoggedIn(false);

    // redirect to home
    history.push('/');
  };

  if(props.isLoggedIn) {
    return (
      <Navbar bg="light" expand="lg">
        <Link to="/">
          <Navbar.Brand>JhaKhaas</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/question">Question</Nav.Link>
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          </Nav>
          <Form inline>
            <Link to='/profile'>
              <Image
                src={personPic}
                roundedCircle
                className="personPic ml-xs-6 mr-sm-2"
              />
            </Link>
            <Nav className="mr-auto">
              <Nav.Link onClick={handleLogout} >Logout</Nav.Link>
            </Nav>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  } else {
    return (
      <Navbar bg="light" expand="lg">
        <Link to="/">
          <Navbar.Brand>JhaKhaas</Navbar.Brand>
        </Link>
      </Navbar>
    ); 
  }
};

export default NavBar;