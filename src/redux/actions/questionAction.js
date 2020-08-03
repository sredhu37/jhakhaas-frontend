import axios from 'axios';
import {
  QUESTION_ACTIVE_TAB,
  QUESTION_CHANGE_CLASS_VALUE,
  QUESTION_CHANGE_SUBJECT_VALUE,
  QUESTION_CHANGE_CHAPTER_VALUE,
  QUESTION_IS_READY,
  QUESTION_INITIALIZE_QUESTIONS,
} from '../constants';
import { startLoading, stopLoading } from './loadingAction';
import { showMessageBox } from './messageBoxAction';


export const setActiveTab = (tabName) => {
  return {
    type: QUESTION_ACTIVE_TAB,
    payload: tabName
  }
}

export const changeClassValue = (classValue) => {
  return {
    type: QUESTION_CHANGE_CLASS_VALUE,
    payload: classValue
  };
};

export const changeSubjectValue = (subject) => {
  return {
    type: QUESTION_CHANGE_SUBJECT_VALUE,
    payload: subject
  };
};

export const changeChapterValue = (chapter) => {
  return {
    type: QUESTION_CHANGE_CHAPTER_VALUE,
    payload: chapter
  };
};

export const setIsQuestionReady = (isReady) => {
  return {
    type: QUESTION_IS_READY,
    payload: isReady
  }
};

export const initializeQuestions = (questions) => {
  return {
    type: QUESTION_INITIALIZE_QUESTIONS,
    payload: questions
  };
};

export const requestGetTodaysQuestions = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(startLoading());
      const requestBody = {
        userId: getState().user.myUser._id,
        className: getState().question.class,
        subject: getState().question.subject,
        chapter: getState().question.chapter
      };

      const result = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/questions`, { params: requestBody });
      
      switch (result.status) {
        case 200:
          console.log(`Response: `, result);
          if (result.data.length) {
            const questions = result.data.map(que => (
              {
                _id: que._id,
                problemStatement: que.problemStatement,
                options: que.options,
                answerByUser: {
                  a: false,
                  b: false,
                  c: false,
                  d: false
                },
              }
            ));

            dispatch(initializeQuestions(questions));
            dispatch(setIsQuestionReady(true));
          } else {
            throw new Error(`No questions found for the selected options!`);
          }
          break;
        default:
          throw new Error(`Unhandled status code while fetching the questions!`);
      }
    } catch(error) {
      dispatch(setIsQuestionReady(false));
      dispatch(showMessageBox(error.toString(), 'danger'));
    } finally {
      dispatch(stopLoading());
    }
  };
};