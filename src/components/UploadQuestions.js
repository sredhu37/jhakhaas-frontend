import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import moment from 'moment';
import axios from 'axios';
import MessageBox from './MessageBox';
import SecureComponent from './SecureComponent';
import AdminComponent from './AdminComponent';

const DATE_FORMAT = 'YYYY-MM-DD';

const UploadQuestions = (props) => {
  const initialStates = {
    dateForQuestions: new Date(),
    classForQuestions: "",
    subjectForQuestions: "",
    questions: [
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
    ]
  };

  const [ displayMessageBox, setDisplayMessageBox ] = useState(false);
  const [ messageBoxText, setMessageBoxText ] = useState("");
  const [ messageBoxVariant, setMessageBoxVariant ] = useState("danger");
  const [ dateForQuestions, setDateForQuestions ] = useState(initialStates.dateForQuestions);
  const [ classForQuestions, setClassForQuestions ] = useState(initialStates.classForQuestions);
  const [ subjectForQuestions, setSubjectForQuestions ] = useState(initialStates.subjectForQuestions);
  const [ questions, setQuestions ] = useState(initialStates.questions);

  const handleDateChange = (date) => {
    console.log("date: ", date);
    setDateForQuestions(date)
  };

  const handleClassChange = (event) => {
    setClassForQuestions(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubjectForQuestions(event.target.value);
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
    if (dateForQuestions) {
      const currentDate = moment().format(DATE_FORMAT);;
      const selectedDate = moment(dateForQuestions).format(DATE_FORMAT);

      if (currentDate > selectedDate) {
        result.isValid = false;
        result.messages.push('Make sure that you are selecting a date in the future!');
      }
    }

    // check whether there is a class selected
    if (classForQuestions < 5 || classForQuestions > 12) {
      result.isValid = false;
      result.messages.push('Please select a class between 5 and 12!');
    }

    if(subjectForQuestions.trim() === '') {
      result.isValid = false;
      result.messages.push('Please select a proper subject!');
    }

    return result;
  };

  const submitForm = async (event) => {
    event.preventDefault();

    const { isValid, messages } = areQuestionsValid();

    if (isValid) {
      try {
        /* Possible outcomes
         * 201 => Questions added successfully
         * 400 => Couldn't add questions
         */
        const bodyObject = {
          questions,
          date: dateForQuestions,
          class: classForQuestions,
          subject: subjectForQuestions,
        };

        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/questions/five`, bodyObject);

        setDateForQuestions(initialStates.dateForQuestions);
        setClassForQuestions(initialStates.classForQuestions);
        setSubjectForQuestions(initialStates.subjectForQuestions);
        setQuestions(initialStates.questions);

        setMessageBoxVariant('success');
        setMessageBoxText(response.data);
        setDisplayMessageBox(true);
      } catch(err) {
        console.log(err.response);
        const msg = err.response ? err.response.data : err;

        setMessageBoxVariant('danger');
        setMessageBoxText(msg.toString());
        setDisplayMessageBox(true);
      }
    } else {
      setMessageBoxVariant('danger');
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
                  <Row>
                    <Col sm={3} xs={1} />
                    <Col sm={6} xs={10}>
                      <Form.Group>
                        <Form.Label>These questions are for which class?</Form.Label>
                        <Form.Control
                          className="selectClass"
                          as="select"
                          value={classForQuestions}
                          onChange={handleClassChange}
                        >
                          <option></option>
                          <option>5</option>
                          <option>6</option>
                          <option>7</option>
                          <option>8</option>
                          <option>9</option>
                          <option>10</option>
                          <option>11</option>
                          <option>12</option>
                        </Form.Control>
                        <Form.Label>These questions are for which subject?</Form.Label>
                        <Form.Control
                          className="selectClass"
                          as="select"
                          value={subjectForQuestions}
                          onChange={handleSubjectChange}
                        >
                          <option></option>
                          <option>Mathematics</option>
                          <option>Physics</option>
                          <option>Chemistry</option>
                          <option>Biology</option>
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
                    <Col sm={3} xs={1} />
                  </Row>
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