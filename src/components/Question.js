import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from 'axios';

const Question = (props) => {
  const [ selectedOptions, setSelectedOptions ] = useState({a: false, b: false, c: false, d: false});
  const [ problemStatement, setProblemStatement ] = useState("");
  const [ options, setOptions ] = useState({a: "", b: "", c: "", d: ""});
  const [ question, setQuestion ] = useState();

  const submitAnswer = async (event) => {
    event.preventDefault();
    console.log(selectedOptions);
    try {
      const answerResponse = await axios.post(
        'http://127.0.0.1:3001/api/questions/submit',
        {
          question,
          usersAnswer: selectedOptions
        },
        { headers: { "auth-token": localStorage.getItem('jwt'),
       }}
      );
  
      if(answerResponse) {
        if(answerResponse.status === 200) {
          console.log('Correct answer');
        } else if(answerResponse.status === 204) {
          console.log('Incorrect answer');
        } else {
          throw new Error(`Unhandled Response status code: ${answerResponse.status}`);
        }
      }
    }
    catch(err) {
      console.log("Error: ", err);
    }
  };

  const handleSelections = (event) => {
    const key = event.target.id;
    const newValue = !selectedOptions[key];

    setSelectedOptions({...selectedOptions, [key]: newValue});
  };

  const getOptionsForm = () => {
    const optionsKeys = Object.keys(options);

    return(
      <Form>
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
  };

  // Empty array as the second argument means "Run only once after render"
  // Equivalent to ComponentDidMount method for a class component
  useEffect(() => {
    const getTodaysQuestion = async () => {
      const errMsg = `Issue in getting today's question. Inform Sunny!`;
      try {
        const questionData = await axios.get(
          'http://127.0.0.1:3001/api/questions/today',
          { headers: { "auth-token": localStorage.getItem('jwt') }}
        );
  
        const questionObj = questionData.data[0];
        setQuestion(questionObj);
  
        if(questionData.status === 200) {
          console.log(`Question: `, questionObj);
          setProblemStatement(questionObj.problemStatement);
          setOptions(questionObj.options);
        } else {
          throw new Error(errMsg);
        }
      } catch(error) {
        console.log(errMsg);
      }
    };

    getTodaysQuestion();
  }, []);

  return (
    <div className="Question">
      <Container fluid>
        <Row>
          <Col sm={1} xs={0} />
          <Col sm={10} xs={12} className="containerColumn">
            Today's Question
            <hr />
            <p>{problemStatement}</p>
            <br />
            {getOptionsForm()}
          </Col>
          <Col sm={1} xs={0} />
        </Row>
      </Container>
    </div>
  );
};

export default Question;
