import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Question = (props) => {
  // console.log(props.jwt);
  const [ selectedOptions, setSelectedOptions ] = useState({a: false, b: false, c: false, d: false});

  const submitAnswer = (event) => {
    event.preventDefault();
    console.log(selectedOptions);
  }

  const handleSelections = (event) => {
    const key = event.target.id;
    const newValue = !selectedOptions[key];
    console.log(`key: ${key}, value: ${newValue}`);

    setSelectedOptions({...selectedOptions, [key]: newValue});
  }

  return (
    <div className="Question">
      <Container fluid>
        <Row>
          <Col sm={1} xs={0} />
          <Col sm={10} xs={12} className="containerColumn">
            Today's Question
            <hr />
            <p>"Sum of 50 and 10 is: "</p>
            <br />
            <Form>
              <Form.Group>
                <Form.Check type="checkbox" label="a: 60" id="a" checked={selectedOptions.a} onChange={handleSelections} />
              </Form.Group>
              <Form.Group>
                <Form.Check type="checkbox" label="b: 30" id="b" checked={selectedOptions.b} onChange={handleSelections} />
              </Form.Group>
              <Form.Group>
                <Form.Check type="checkbox" label="c: 200" id="c" checked={selectedOptions.c} onChange={handleSelections} />
              </Form.Group>
              <Form.Group>
                <Form.Check type="checkbox" label="d: 2" id="d" checked={selectedOptions.d} onChange={handleSelections} />
              </Form.Group>
              <Button variant="primary" type="submit" onClick={ submitAnswer }>
                Submit
              </Button>
            </Form>
          </Col>
          <Col sm={1} xs={0} />
        </Row>
      </Container>
    </div>
  );
};

export default Question;
