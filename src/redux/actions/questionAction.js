import { QUESTION_ACTIVE_TAB } from '../constants';

export const setActiveTab = (tabName) => {
  return {
    type: QUESTION_ACTIVE_TAB,
    payload: tabName
  }
}
