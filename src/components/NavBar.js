import React from 'react';
import { Navbar, Nav, Form, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import personPic from '../static/nopic.png';

const NavBar = (props) => {
  const handleLogout = async (event) => {
    event.preventDefault();

    // set isLoggedIn to false
    props.setIsLoggedIn(false);

    window.open(`${process.env.REACT_APP_SERVER_URL}/auth/logout`, "_self");
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    window.open(`${process.env.REACT_APP_SERVER_URL}/auth/google/login`, "_self");
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
            <Nav.Link as={Link} to='/question'>Question</Nav.Link>
            <Nav.Link as={Link} to='/dashboard'>Dashboard</Nav.Link>
          </Nav>
          <Form inline>
            <Nav className="mr-auto">
              <Link to='/profile'>
                <Image
                  src={props.myUser.pictureUrl ? props.myUser.pictureUrl : personPic}
                  roundedCircle
                  className="personPic"
                />
              </Link>
            </Nav>
            <Nav className="mr-auto">
              <Button variant="outline-info" onClick={handleLogout}>Logout</Button>
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
        <Form inline>
          <Nav className="mr-auto">
            <Button variant="outline-info" onClick={handleLogin}>Login</Button>
          </Nav>
        </Form>
      </Navbar>
    ); 
  }
};

export default NavBar;