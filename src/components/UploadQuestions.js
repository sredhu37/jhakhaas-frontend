import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import MessageBox from './MessageBox';
import SecureComponent from './SecureComponent';
import AdminComponent from './AdminComponent';

const UploadQuestions = (props) => {
  const [ displayMessageBox, setDisplayMessageBox ] = useState(false);
  const [ messageBoxText, setMessageBoxText ] = useState("");
  const [ messageBoxVariant, setMessageBoxVariant ] = useState("danger");
  const [ dateForQuestions, setDateForQuestions ] = useState(new Date());
  const [ classForQuestions, setClassForQuestions ] = useState("OTHER");
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
      answer: {
        a: false,
        b: false,
        c: false,
        d: false
      }
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
      answer: {
        a: false,
        b: false,
        c: false,
        d: false
      },
      finalAnswersString: ""
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
      answer: {
        a: false,
        b: false,
        c: false,
        d: false
      },
      finalAnswersString: ""
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
      answer: {
        a: false,
        b: false,
        c: false,
        d: false
      },
      finalAnswersString: ""
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
      answer: {
        a: false,
        b: false,
        c: false,
        d: false
      },
      finalAnswersString: ""
    }
  ]);

  const handleDateChange = (date) => {
    console.log("date: ", date);
    setDateForQuestions(date)
  };

  const handleClassChange = (event) => {
    setClassForQuestions(event.target.value);
  };

  const areQuestionsValid = () => {
    const result = { 
      isValid: true,
      messages: []
    };

    questions.forEach(que => {
      // check that each question has a problem statement
      if(que.problemStatement.trim() === '') {
        result.isValid = false;
        result.messages.push(`Problem statement is empty for question number: ${que.number}`);
      }

      // check that each question has 4 options
      if (
        que.options.a.trim() === '' ||
        que.options.b.trim() === '' ||
        que.options.c.trim() === '' ||
        que.options.d.trim() === ''
      ) {
        result.isValid = false;
        result.messages.push(`Option(s) is/are empty for question number: ${que.number}`);
      }

      // check that answer has value
      if(!(que.answer.a || que.answer.b || que.answer.c || que.answer.d)) {
        result.isValid = false;
        result.messages.push(`You forgot to select the answer(s) for question number: ${que.number}`);
      }
    });

    // check that there is a date selected which is not in past

    // check whether there is a class selected

    return result;
  };

  const submitForm = (event) => {
    event.preventDefault();

    const { isValid, messages } = areQuestionsValid();

    if (isValid) {
      console.log("all valid");
      const updatedQuestionsObj = questions.map(que => {
        return {
          ...que,
          dateAsked: dateForQuestions,
          class: classForQuestions
        };
      });

      setQuestions(updatedQuestionsObj);
    } else {
      setMessageBoxVariant();
      setMessageBoxText(messages[0]);
      setDisplayMessageBox(true);
    }
  };

  return(
    <SecureComponent isLoggedIn={props.isLoggedIn} component={
      <AdminComponent myUser={props.myUser} component={
        <div>
          <MessageBox
            message={ messageBoxText }
            variant={ messageBoxVariant }
            displayMessageBox={ displayMessageBox }
            setDisplayMessageBox={ setDisplayMessageBox }
          />
          <Container fluid>
            <Form>
              <FiveQuestionsForm questions={questions} setQuestions={setQuestions} />
              <Row>
                <Col sm={1} xs={0} />
                <Col sm={10} xs={12} className="containerColumn">
                <Form.Group>
                  <Form.Label>These questions are for which class?</Form.Label>
                  <Form.Control className="selectClass" as="select" value={classForQuestions} onChange={handleClassChange}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                    <option>OTHER</option>
                  </Form.Control>
                  <Form.Label>Which date are these questions for?</Form.Label>
                  <div className="datePicker">
                    <DatePicker value={dateForQuestions} onChange={handleDateChange} />
                  </div>
                  <Button variant="primary" onClick={submitForm} className="submitButton" >
                    Upload all 5 questions
                  </Button>
                </Form.Group>
                </Col>
                <Col sm={1} xs={0} />
              </Row>
              </Form>
          </Container>
        </div>
      } />
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

  const handleAnswerChange = (event) => {
    const updatedQuestionsObj = questions.map(que => {
      if(que.number === questionNumber) {
        return {
          ...que,
          answer: {
            ...que.answer,
            [event.target.name]: !que.answer[event.target.name]
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
      <EnterAnswers
        questions={questions}
        questionNumber={questionNumber}
        handleAnswerChange={handleAnswerChange}
      />
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

const EnterAnswers = ({ questions, questionNumber, handleAnswerChange }) => {
  return(
    <Form.Group>
        <Form.Label>What is the answer?</Form.Label>
        <Row>
          <Col sm={6} xs={12} >
            <Form.Check
              type="checkbox"
              name="a"
              label={`a: ${questions[questionNumber-1].options.a}`}
              value={questions[questionNumber-1].answer.a}
              onChange={handleAnswerChange}
            />
          </Col>
          <Col sm={6} xs={12} >
            <Form.Check
              type="checkbox"
              name="b"
              label={`b: ${questions[questionNumber-1].options.b}`}
              value={questions[questionNumber-1].answer.b}
              onChange={handleAnswerChange}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={6} xs={12} >
            <Form.Check
              type="checkbox"
              name="c"
              label={`c: ${questions[questionNumber-1].options.c}`}
              value={questions[questionNumber-1].answer.c}
              onChange={handleAnswerChange}
            />
          </Col>
          <Col sm={6} xs={12} >
            <Form.Check
              type="checkbox"
              name="d"
              label={`d: ${questions[questionNumber-1].options.d}`}
              value={questions[questionNumber-1].answer.d}
              onChange={handleAnswerChange}
            />
          </Col>
        </Row>
      </Form.Group>
  );
};

// Helper components end here

export default UploadQuestions;