import React from 'react';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import GoogleButton from 'react-google-button';

const Login = () => {
  return (
    <div className='Login'>
      <Container>
        <Row>
          <Col xs={1} sm={3} />
          <Col className='LoginMainGridItem' xs={10} sm={6} >
            LOGIN
            <hr />
            <GoogleButton className='GoogleLoginButton'
              onClick={() => { console.log('Google button clicked') }}
            />
          </Col>
          <Col xs={1} sm={3} />
        </Row>
      </Container>
    </div>
  );
}

export default Login;
