// imports begin here

import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import MessageBox from './MessageBox';
// imports end here

// Login component begins here

const Login = (props) => {
  // variables declaration begin here
  const history = useHistory();

  const [ displayMessageBox, setDisplayMessageBox ] = useState(false);
  const [ messageBoxText, setMessageBoxText ] = useState("");

  // variables declaration end here

  // helper functions begin here

  const tryGoogleLogin = async (event) => {
    event.preventDefault();
    window.open("http://127.0.0.1:4000/auth/google/login", "_self");

    // try {
    //   const jwtToken = await axios.post(
    //     "http://localhost:3001/auth/local/login",
    //     {
    //       email: email,  // "xykdsffgfdfjz@gmail.com"
    //       password: password,   // "Hello@123"
    //     }
    //   );

    //   if (jwtToken.status === 200) {
    //     localStorage.setItem('jwt', jwtToken.data);
    //     props.setIsLoggedIn(true);
    //     history.push(`/question`);
    //   } else if (jwtToken.status === 401) {
    //     throw new Error("Incorrect username or password!");
    //   }
    // } catch(error) {
    //   const msg = (error.response) ? 'Incorrect username or password!' : error.toString();

    //   setMessageBoxText(msg);
    //   setDisplayMessageBox(true);
    // }
  };

  // helper functions end here

  // main rendering begins here

  return (
    <div className="Login">
      <MessageBox
        message={ messageBoxText }
        variant="danger"
        displayMessageBox={ displayMessageBox }
        setDisplayMessageBox={ setDisplayMessageBox }
      />
      <Container>
        <Row>
          <Col xs={1} sm={3} />
          <Col className="LoginMainGridItem" xs={10} sm={6}>
            LOGIN
            <hr />
            <Row>
            <Col xs={1} sm={3} />
            <Col xs={10} sm={6}>
              <GoogleButton onClick={ tryGoogleLogin } />
            </Col>
            <Col xs={1} sm={3} />
            </Row>
          </Col>
          <Col xs={1} sm={3} />
        </Row>
      </Container>
    </div>
  );

  // main rendering ends here
};

// Login component ends here

export default Login;
