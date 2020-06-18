import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import MessageBox from './MessageBox';
import SecureComponent from './SecureComponent';

const UploadQuestions = (props) => {
  const [ displayMessageBox, setDisplayMessageBox ] = useState(false);
  const [ messageBoxText, setMessageBoxText ] = useState("");
  const [ messageBoxVariant, setMessageBoxVariant ] = useState("danger");
  const [ dateForQuestions, setDateForQuestions ] = useState(new Date());
  const [ questions, setQuestions ] = useState([
    {
      number: 1,
      problemStatement: "",
      options: {
        a: "",
        b: "",
        c: "",
        d: ""
      },
      correctAnswerString: ""
    },
    {
      number: 2,
      problemStatement: "",
      options: {
        a: "",
        b: "",
        c: "",
        d: ""
      },
      correctAnswerString: ""
    },
    {
      number: 3,
      problemStatement: "",
      options: {
        a: "",
        b: "",
        c: "",
        d: ""
      },
      correctAnswerString: ""
    },
    {
      number: 4,
      problemStatement: "",
      options: {
        a: "",
        b: "",
        c: "",
        d: ""
      },
      correctAnswerString: ""
    },
    {
      number: 5,
      problemStatement: "",
      options: {
        a: "",
        b: "",
        c: "",
        d: ""
      },
      correctAnswerString: ""
    }
  ]);

  const handleDateChange = (date) => {
    console.log("date: ", date);
    setDateForQuestions(date)
  }

  const submitForm = (event) => {
    event.preventDefault();
    console.log("");
  };

  return(
    <SecureComponent isLoggedIn={props.isLoggedIn} component={
      <div className="Question">
        <MessageBox
          message={ messageBoxText }
          variant={ messageBoxVariant }
          displayMessageBox={ displayMessageBox }
          setDisplayMessageBox={ setDisplayMessageBox }
        />
        <Container fluid>
          <Form>
            <FiveQuestionsForm questions={questions} setQuestions={setQuestions} />
            <Form.Label>Which date are these questions for?</Form.Label>
            <div className="datePicker">
              <DatePicker value={dateForQuestions} onChange={handleDateChange} />
            </div>
            <Button variant="primary" onClick={submitForm} className="submitButton" >
              Upload all 5 questions
            </Button>
          </Form>
        </Container>
      </div>
    } />
  );
};

// Helper components begin here

const FiveQuestionsForm = ({ questions, setQuestions }) => {
  return questions.map(que => {
    return(
      <div key={que.number}>
        <Row>
          <Col sm={1} xs={0} />
          <Col sm={10} xs={12} className="containerColumn">
            <b>QUESTION {que.number}:</b>
            <SingleQuestion
              questionNumber={que.number}
              questions={questions}
              setQuestions={setQuestions}
            />
          </Col>
          <Col sm={1} xs={0} />
        </Row>
      </div>
    );
  });
};

const SingleQuestion = ({ questionNumber, questions, setQuestions }) => {
  const handleProblemStatementChange = (event) => {
    const updatedQuestionsObj = questions.map(que => {
      if(que.number === questionNumber) {
        return {
          ...que,
          problemStatement: event.target.value
        };
      } else {
        return que;
      }
    });

    setQuestions(updatedQuestionsObj);
  };

  const handleOptionTextChange = (event) => {
    const updatedQuestionsObj = questions.map(que => {
      if(que.number === questionNumber) {
        return {
          ...que,
          options: {
            ...que.options,
            [event.target.name]: event.target.value
          }
        };
      } else {
        return que;
      }
    });

    setQuestions(updatedQuestionsObj);
  };

  return(
    <div>
      <Form.Group>
        <Form.Label>What is the problem statement?</Form.Label>
        <Form.Control
          placeholder="Enter question here"
          as="textarea"
          rows="3"
          onChange={handleProblemStatementChange}
        />
      </Form.Group>
      <EnterOptions handleOptionTextChange={handleOptionTextChange} />
      <EnterAnswers questions={questions} questionNumber={questionNumber} />
    </div>
  );
};

const EnterOptions = ({ handleOptionTextChange }) => {
  return(
    <Form.Group>
      <Form.Label>What are the options?</Form.Label>
      <Row>
        <Col sm={6} xs={12} >
          <Form.Control
            type="text"
            placeholder="Enter option a"
            className="optionText"
            name="a"
            onChange={ handleOptionTextChange }
          />
        </Col>
        <Col sm={6} xs={12} >
          <Form.Control
            type="text"
            placeholder="Enter option b"
            className="optionText"
            name="b"
            onChange={ handleOptionTextChange }
          />
        </Col>
      </Row>
      <Row>
        <Col sm={6} xs={12} >
          <Form.Control
            type="text"
            placeholder="Enter option c"
            className="optionText"
            name="c"
            onChange={ handleOptionTextChange }
          />
        </Col>
        <Col sm={6} xs={12} >
          <Form.Control
            type="text"
            placeholder="Enter option d"
            className="optionText"
            name="d"
            onChange={ handleOptionTextChange }
          />
        </Col>
      </Row>
    </Form.Group>
  );
};

const EnterAnswers = ({ questions, questionNumber }) => {
  return(
    <Form.Group>
        <Form.Label>What is the answer?</Form.Label>
        <Row>
          <Col sm={6} xs={12} >
            <Form.Check
              type="checkbox"
              label={`a: ${questions[questionNumber-1].options.a}`}
            />
          </Col>
          <Col sm={6} xs={12} >
            <Form.Check
              type="checkbox"
              label={`b: ${questions[questionNumber-1].options.b}`}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={6} xs={12} >
            <Form.Check
              type="checkbox"
              label={`c: ${questions[questionNumber-1].options.c}`}
            />
          </Col>
          <Col sm={6} xs={12} >
            <Form.Check
              type="checkbox"
              label={`d: ${questions[questionNumber-1].options.d}`}
            />
          </Col>
        </Row>
      </Form.Group>
  );
};

// Helper components end here

export default UploadQuestions;