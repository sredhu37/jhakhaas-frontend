// imports begin here

import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import MessageBox from './MessageBox';
// imports end here

// Login component begins here

const Login = (props) => {
  // variables declaration begin here

  const history = useHistory();
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ displayMessageBox, setDisplayMessageBox ] = useState(false);
  const [ messageBoxText, setMessageBoxText ] = useState("");

  // variables declaration end here

  // helper functions end here

  const tryBasicLogin = async (event) => {
    event.preventDefault();
    // console.log(`Email: ${email}, Password: ${password}`);

    try {
      const jwtToken = await axios.post(
        "http://localhost:3001/auth/local/login",
        {
          email: email,  // "xykdsffgfdfjz@gmail.com"
          password: password,   // "Hello@123"
        }
      );
  
      if (jwtToken.status === 200) {
        // console.log(`jwt token: ${jwtToken.data}`);
        localStorage.setItem('jwt', jwtToken.data);
        history.push(`/question`);
      } else if (jwtToken.status === 401) {
        throw new Error("Incorrect username or password!");
      }
    } catch(error) {
      const msg = 'Incorrect username or password!';
      console.log(msg);
      setMessageBoxText(msg);
      setDisplayMessageBox(true);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // helper functions end here

  // main rendering begins here

  return (
    <div className="Login">
      <Container fluid>
        <Row>
        <Col xs={1} sm={3} />
        <Col xs={10} sm={6}>
          <MessageBox
            message={ messageBoxText }
            variant="danger"
            displayMessageBox={ displayMessageBox }
            setDisplayMessageBox={ setDisplayMessageBox }
          />
        </Col>
        <Col xs={1} sm={3} />
        </Row>
      </Container>
      <Container>
        <Row>
          <Col xs={1} sm={3} />
          <Col className="LoginMainGridItem" xs={10} sm={6}>
            LOGIN
            <hr />
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={ email } onChange={ handleEmailChange } />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={ password } onChange={ handlePasswordChange } />
              </Form.Group>
              <Button variant="primary" type="submit" onClick={ tryBasicLogin }>
                Submit
              </Button>
            </Form>
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
