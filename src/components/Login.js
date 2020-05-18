import React from 'react';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import GoogleButton from 'react-google-button';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const Login = (props) => {
  const history = useHistory();

  const tryLoginByGoogle = async () => {
    const jwtToken = await axios.post(
      'http://localhost:3001/auth/local/login',
      {
        "email": "xykdsffgfdfjz@gmail.com",
        "password": "Hello@123"
      }
    );
    if(jwtToken.status === 200) {
      // console.log(`jwt token: ${jwtToken.data}`);
      props.setJwt(jwtToken.data);
      history.push(`/question`);
    } else if(jwtToken.status === 401) {
      console.log(`Couldn't login!`);
    }
  }

  return (
    <div className='Login'>
      <Container>
        <Row>
          <Col xs={1} sm={3} />
          <Col className='LoginMainGridItem' xs={10} sm={6} >
            LOGIN
            <hr />
            <GoogleButton className='GoogleLoginButton'
              onClick={ tryLoginByGoogle }
            />
          </Col>
          <Col xs={1} sm={3} />
        </Row>
      </Container>
    </div>
  );
}

export default Login;
