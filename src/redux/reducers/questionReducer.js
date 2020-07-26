import { QUESTION_ACTIVE_TAB } from '../constants';

const initialState = {
  activeTab: 'question1'
};

const questionReducer = (state = initialState, action) => {
  switch(action.type) {
    case QUESTION_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.payload
      }
    default:
      return state;
  }
};

export default questionReducer;