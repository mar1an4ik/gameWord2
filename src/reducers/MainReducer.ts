import { handleActions } from 'redux-actions';

import { restartGame, setAnswer } from "../actions";

const defaultState = {
  answers: ["", "", "", ""]
};

export const MainReducer = handleActions(
  {
    [setAnswer]: (state, { payload: { questionNumber:any, answer } }) => {
      let statecopy = { ...state };
      statecopy.answers = [...state.answers];
      statecopy.answers[questionNumber] = answer;

      return statecopy;
    },
    [restartGame]: (state) => {
      let statecopy = { ...state };
      statecopy.answers = [...state.answers];
      statecopy.answers = [];

      return statecopy;
    }
  }, defaultState
);
