import {Action, handleActions} from 'redux-actions';

import { restartGame, setAnswer } from "../actions";
import {setAnswerPayload} from '../actions/mainActions';

const defaultState = {
  answers: ["", "", "", ""]
};

type State = {
  answers: Array<string>;
};
type CombinedPayloads = setAnswerPayload ;

export const MainReducer = handleActions<State, CombinedPayloads>(
  {
    [setAnswer.toString()]: (state, {payload: {questionNumber, answer}}: Action<setAnswerPayload>) : State => {
      let statecopy = { ...state }
      statecopy.answers = [...state.answers];
      statecopy.answers[questionNumber] = answer;

      return statecopy;
    },
    [restartGame.toString()]: (state):State => {
      let statecopy = { ...state };
      statecopy.answers = [...state.answers];
      statecopy.answers = ["", "", "", ""]

      return statecopy;
    }
  }, defaultState
);
