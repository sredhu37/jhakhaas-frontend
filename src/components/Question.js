import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from 'axios';
import SecureComponent from './SecureComponent';
import MessageBox from './MessageBox';
import { useSelector, useDispatch } from "react-redux";
import { showMessageBox } from "../redux/actions/messageBoxAction";

const Question = () => {
  const dispatch = useDispatch();
  const myUser = useSelector(state => state.user.myUser);

  const [ classForQuestions, setClassForQuestions ] = useState("");
  const [ subjectForQuestions, setSubjectForQuestions ] = useState("");
  const [ selectedOptions, setSelectedOptions ] = useState({a: false, b: false, c: false, d: false});
  const [ problemStatement, setProblemStatement ] = useState("");
  const [ options, setOptions ] = useState({a: "", b: "", c: "", d: ""});
  const [ question, setQuestion ] = useState();
  const [ isQuestionReady, setIsQuestionReady ] = useState(false);

  const submitAnswer = async (event) => {
    event.preventDefault();

    try {
      const answerResponse = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/questions/submit`,
        {
          question,
          usersAnswer: selectedOptions
        }
      );

      if(answerResponse) {
        switch(answerResponse.status) {
          case 200:
            dispatch(showMessageBox('Correct answer. Check your Profile for score!', 'success'));
            break;
          case 204:
            dispatch(showMessageBox('Incorrect answer!', 'danger'));
            break;
          case 208:
            dispatch(showMessageBox('Number of tries exceeded 3!', 'danger'));
            break;
          default:
            throw new Error(`Unhandled Response status code: ${answerResponse.status}`);
        }
      }
    }
    catch(err) {
      dispatch(showMessageBox(err, 'danger'));
    }
  };

  const getTodaysQuestion = async (selectedClass, selectedSubject) => {
    try {
      const questionsData = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/questions/today`,
        {
          params: {
            selectedClass: selectedClass,
            selectedSubject: selectedSubject
          }
        }
      );

      // sort by question numbers
      const questionsArr = questionsData.data.sort((que1, que2) => que1.number - que2.number);

      // If question is not solved. Then it can be displayed.
      // i.e. If question is attempted and solved (correctly), then that question should not be displayed.
      const questionsToDisplay = questionsArr.filter(que => {
        if(myUser.questionsAttempted && myUser.questionsAttempted.length) {
          const isQuestionSolved = myUser.questionsAttempted.some(attemptedQue => (attemptedQue._id.localeCompare(que._id) === 0 && attemptedQue.score > 0));
          return !isQuestionSolved;
        } else {
          return true;
        }
      });

      if (questionsToDisplay.length) {
        const questionObj = questionsToDisplay[0];
        setQuestion(questionObj);

        if(questionsData.status === 200) {
          setIsQuestionReady(true);
          setProblemStatement(questionObj.problemStatement);
          setOptions(questionObj.options);
        } else {
          throw new Error(`Issue in getting today's question. Inform Administrator immediately!`);
        }
      } else if(questionsArr.length && !questionsToDisplay.length) {
        dispatch(showMessageBox(`Congratulations! You have solved all ${selectedSubject} questions for today for class ${selectedClass}!`, 'success'));
      } else {
        throw new Error(`Unhandled scenario for getting today's question. Inform Administrator immediately!`);
      }
    } catch(error) {
      const msg = error.response ? error.response.data : error;
      setIsQuestionReady(false);

      dispatch(showMessageBox(msg.toString(), 'danger'));
    }
  };

  const handleSelections = (event) => {
    const key = event.target.id;
    const newValue = !selectedOptions[key];

    setSelectedOptions({...selectedOptions, [key]: newValue});
  };

  const getOptionsForm = (showQuestion) => {
    const optionsKeys = Object.keys(options);

    if(showQuestion) {
      return(
        <Form>
          <h2>Question</h2>
          <p>{problemStatement}</p>
          <br />
          {
            optionsKeys.map(key => {
              return (<Form.Group key={key}>
                <Form.Check
                  type="checkbox"
                  label={key + ": " + options[key]}
                  id={key}
                  checked={selectedOptions[key]}
                  onChange={handleSelections}
                />  
              </Form.Group>)
            })
          }
  
          <Button variant="primary" type="submit" onClick={ submitAnswer }>
            Submit
          </Button>
        </Form>
      );
    } else {
      return null;
    }
  };

  const handleClassChange = async (event) => {
    setClassForQuestions(event.target.value);
    await getQuestion(event.target.value, subjectForQuestions);
  };

  const handleSubjectChange = async (event) => {
    setSubjectForQuestions(event.target.value);
    await getQuestion(classForQuestions, event.target.value);
  };

  const getQuestion = async (selectedClass, selectedSubject) => {
    if(selectedClass.trim() !== '' && selectedSubject.trim() !== '') {
      setIsQuestionReady(true);
      await getTodaysQuestion(selectedClass, selectedSubject);
    } else {
      console.log('Select proper values for class and subject');
      setIsQuestionReady(false);
    }
  };

  return (
    <SecureComponent component={
      <div className="Question">
        <MessageBox />
        <Container fluid>
          <Row>
            <Col sm={1} xs={0} />
            <Col sm={10} xs={12} className="containerColumn">
              <Form>
                <Form.Group as={Row}>
                  <Form.Label column xs={4}>Select class</Form.Label>
                  <Col xs={8} sm={6}>
                    <Form.Control as="select" value={classForQuestions} onChange={handleClassChange}>
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
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column xs={4}>Select subject</Form.Label>
                  <Col xs={8} sm={6}>
                    <Form.Control as="select" value={subjectForQuestions} onChange={handleSubjectChange}>
                      <option></option>
                      <option>Mathematics</option>
                      <option>Physics</option>
                      <option>Chemistry</option>
                      <option>Biology</option>
                    </Form.Control>
                  </Col>
                </Form.Group>
              </Form>
              <br />
              {getOptionsForm(isQuestionReady)}
            </Col>
            <Col sm={1} xs={0} />
          </Row>
        </Container>
      </div>  
    } />
  );
};

export default Question;
