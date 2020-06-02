import React, { useEffect } from 'react';
import { Accordion, Card, Container, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Home = (props) => {
  axios.defaults.withCredentials = true;
  const history = useHistory();

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      try {
        await axios.get(`${process.env.REACT_APP_SERVER_URL}/auth/isLoggedIn`);
        props.setIsLoggedIn(true);
        history.push("/profile");
      } catch(error) {
        props.setIsLoggedIn(false);
      }
    }

    checkIfLoggedIn();
  });

  return(
    <div>
      <Container>
        <Row>
          <Col xs={1} sm={3} />
          <Col xs={10} sm={6}>
            <Accordion className="homeAccordian">
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  What is this app about?
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <p>
                      We believe that improving oneself is a continuous process.
                      Hence, we have come up with a simple concept to improve one's problem solving skill.
                      That is just solve <b>ONE QUESTION PER DAY</b>.
                    </p>
                    <p>
                      By following this principle, you will not feel overwhelmed and you will learn something everyday.
                    </p>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="2">
                  How to use this app?
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                  <Card.Body>
                    <ul>
                      <li>
                        To login you need to have a gmail account.
                      </li>
                      <li>
                        After logging in, you will see your <i>Profile</i>.
                      </li>
                      <li>
                        You can click on the <i>Question</i> tab to attempt today's question.
                      </li>
                      <li>
                        You can read the question, solve it and come back later to answer it within the same day.
                      </li>
                      <li>
                        You cannot attempt a question more than 3 times.
                      </li>
                      <li>
                        For every correct answer, you get 1 point. No negative marking.
                      </li>
                      <li>
                        Dashboard tab means Leader's dashboard. You can check your current rank there.
                      </li>
                      <li>
                        To go to your profile page, click on your Photo on the top right corner.
                      </li>
                    </ul>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="3">
                  How to contact the developer?
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="3">
                  <Card.Body>
                    Please reach out to me at <b><i>redhu.sunny1994@gmail.com</i></b> in any of the following cases:
                    <ul>
                      <li>
                        You have good interesting problems you want on this app.
                      </li>
                      <li>
                        You want a new feature to be added here.
                      </li>
                      <li>
                        There is a bug in this app.
                      </li>
                      <li>
                        You have any other good idea that can be implemented.
                      </li>
                      <li>
                        Or just to say Hi!
                      </li>
                    </ul>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="4">
                  In the end, I would like to say:
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="4">
                  <Card.Body>
                    <h4>Chalo Sawaal Banate Hain</h4>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
          <Col xs={1} sm={3} />
        </Row>
      </Container>
    </div>
  );
};

export default Home;