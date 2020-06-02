import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SecureComponent from './SecureComponent';

const Profile = (props) => {
  useEffect(() => {
    const getProfile = async () => {
      try {
        const profile = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/profile`);
        if(profile) {
          props.setMyUser(profile.data);
        } else {
          throw new Error("Couldn't receive profile from the server. Inform Sunny immediately!")
        }
      } catch(error) {
        console.log(error);
      }
    };

    getProfile();
  }, []);

  return(
    <SecureComponent isLoggedIn={props.isLoggedIn} component={
      <div>
        <Container>
          <Row>
            <Col xs={1} sm={3} />
            <Col xs={10} sm={6}>
            <Card className="profileCard">
              <Card.Img variant="top" src={ props.myUser.pictureUrl } className="profileImage" />
              <Card.Body>
                <Card.Title>{ props.myUser.email }</Card.Title>
                <Card.Text>
                  My total score: { props.myUser.totalScore }
                </Card.Text>
                <Link to="/dashboard">
                  <Button variant="outline-info">Check your rank</Button>
                </Link>
              </Card.Body>
            </Card>
            </Col>
            <Col xs={1} sm={3} />
          </Row>
        </Container>
      </div>
    } />
  );
};

export default Profile;
