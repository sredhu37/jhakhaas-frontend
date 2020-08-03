import { 
  QUESTION_ACTIVE_TAB,
  QUESTION_CHANGE_CLASS_VALUE,
  QUESTION_CHANGE_SUBJECT_VALUE,
  QUESTION_CHANGE_CHAPTER_VALUE,
  QUESTION_IS_READY,
  QUESTION_INITIALIZE_QUESTIONS,
} from '../constants';

const initialState = {
  questions: [{
    _id: '',
    problemStatement: '',
    options: {
      a: '',
      b: '',
      c: '',
      d: ''
    },
    answerByUser: {
      a: false,
      b: false,
      c: false,
      d: false
    },
  }],
  activeTab: 'question1',
  class: '',
  subject: '',
  chapter: '',
  isQuestionReady: false,
};

const questionReducer = (state = initialState, action) => {
  switch(action.type) {
    case QUESTION_ACTIVE_TAB:   // used in uploadQuestions component
      return {
        ...state,
        activeTab: action.payload
      };
    case QUESTION_CHANGE_CLASS_VALUE:
      return {
        ...state,
        class: action.payload
      };
    case QUESTION_CHANGE_SUBJECT_VALUE:
      return {
        ...state,
        subject: action.payload
      };
    case QUESTION_CHANGE_CHAPTER_VALUE:
      return {
        ...state,
        chapter: action.payload
      };
    case QUESTION_IS_READY:
      return {
        ...state,
        isQuestionReady: action.payload
      }
    case QUESTION_INITIALIZE_QUESTIONS:
      return {
        ...state,
        questions: action.payload
      };
    default:
      return state;
  }
};

export default questionReducer;