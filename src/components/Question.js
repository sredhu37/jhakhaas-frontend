import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from 'axios';
import SecureComponent from './SecureComponent';
import MessageBox from './MessageBox';

const Question = (props) => {
  const [ selectedOptions, setSelectedOptions ] = useState({a: false, b: false, c: false, d: false});
  const [ questions, setQuestions ] = useState([]);
  const [ displayMessageBox, setDisplayMessageBox ] = useState(false);
  const [ messageBoxText, setMessageBoxText ] = useState("");
  const [ messageBoxVariant, setMessageBoxVariant ] = useState("danger");

  const submitAnswer = async (event) => {
    event.preventDefault();

    // try {
    //   const answerResponse = await axios.post(
    //     `${process.env.REACT_APP_SERVER_URL}/api/questions/submit`,
    //     {
    //       question,
    //       usersAnswer: selectedOptions
    //     }
    //   );
    //   console.log("sunny: ", answerResponse);

    //   if(answerResponse) {
    //     switch(answerResponse.status) {
    //       case 200:
    //         setMessageBoxText('Correct answer. Check your Profile for score!');
    //         setMessageBoxVariant('success');
    //         break;
    //       case 204:
    //         setMessageBoxText('Incorrect answer');
    //         setMessageBoxVariant('danger');
    //         break;
    //       case 208:
    //         setMessageBoxText('Number of tries exceeded 3');
    //         setMessageBoxVariant('danger');
    //         break;
    //       default:
    //         throw new Error(`Unhandled Response status code: ${answerResponse.status}`);
    //     }
    //   }
    // }
    // catch(err) {
    //   setMessageBoxText(err);
    //   setMessageBoxVariant('danger');
    // }
    setDisplayMessageBox(true);
  };

  const handleSelections = (event) => {
    const key = event.target.id;
    const newValue = !selectedOptions[key];

    setSelectedOptions({...selectedOptions, [key]: newValue});
  };

  const getOptionsForm = (que) => {
    const options = que.options;

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

  const getQuestions = () => {
    const result = questions.map(que => {
      return(
        <div>
          <p>{que.problemStatement}</p>
          <br />
          {getOptionsForm(que)}
        </div>
      );
    });

    return result;
  };

  // Empty array as the second argument means "Run only once after render"
  // Equivalent to ComponentDidMount method for a class component
  useEffect(() => {
    const getTodaysQuestions = async () => {
      const errMsg = `Issue in getting today's questions. Inform Sunny!`;
      try {
        const questionsData = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/questions/today`
        );
  
        if(questionsData.status === 200) {
          if(questionsData.data.length < 5) {
            throw new Error(errMsg);
          } else if (questionsData.data.length > 5){
            setQuestions((questionsData.data).slice(0, 5));
          } else {
            setQuestions(questionsData.data);
          }
        } else {
          throw new Error(errMsg);
        }
      } catch(error) {
        console.log(errMsg);
      }
    };

    getTodaysQuestions();
  }, []);

    return (
      <SecureComponent isLoggedIn={props.isLoggedIn} component={
        <div className="Question">
          <MessageBox
            message={ messageBoxText }
            variant={ messageBoxVariant }
            displayMessageBox={ displayMessageBox }
            setDisplayMessageBox={ setDisplayMessageBox }
          />
          <Container fluid>
            <Row>
              <Col sm={1} xs={0} />
              <Col sm={10} xs={12} className="containerColumn">
                Today's Questions
                <hr />
                {getQuestions()}
              </Col>
              <Col sm={1} xs={0} />
            </Row>
          </Container>
        </div>  
      } />
    );
};

export default Question;
