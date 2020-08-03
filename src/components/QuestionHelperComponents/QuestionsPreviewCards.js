import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

const QuestionsPreviewCards = () => {
  const { isQuestionReady, problemStatement, options, answerByUser } = useSelector(state => state.question);

  if (isQuestionReady) {
    return (
      <Container>
        <Row>
          <Col sm={4} xs={12}>
            <Card className="cardQuestion">
              <Card.Body>
                <Card.Title>Que 1</Card.Title>
                <Card.Text>
                  Problem statement for Question 1 for 60 characters...
                </Card.Text>
                <Card.Link href="#">Solve</Card.Link>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={4} xs={12}>
            <Card className="cardQuestion">
              <Card.Body>
                <Card.Title>Que 2</Card.Title>
                <Card.Text>
                  Problem statement for Question 2 for 60 characters...
                </Card.Text>
                <Card.Link href="#">Solve</Card.Link>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={4} xs={12}>
            <Card className="cardQuestion">
              <Card.Body>
                <Card.Title>Que 3</Card.Title>
                <Card.Text>
                  Problem statement for Question 3 for 60 characters...
                </Card.Text>
                <Card.Link href="#">Solve</Card.Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col sm={4} xs={12}>
            <Card className="cardQuestion">
              <Card.Body>
                <Card.Title>Que 4</Card.Title>
                <Card.Text>
                  Problem statement for Question 4 for 60 characters...
                </Card.Text>
                <Card.Link href="#">Solve</Card.Link>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={4} xs={12}>
            <Card className="cardQuestion">
              <Card.Body>
                <Card.Title>Que 5</Card.Title>
                <Card.Text>
                  Problem statement for Question 5 for 60 characters...
                </Card.Text>
                <Card.Link href="#">Solve</Card.Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <div>
        Please select proper values for Class, Subject and Chapter.
      </div>
    );
  }
};

export default QuestionsPreviewCards;