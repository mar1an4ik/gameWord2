import { handleActions } from 'redux-actions';

import { getAllWords } from "../actions";

const defaultState = {
  words: ["da"],
};

export const MainReducer = handleActions(
  {
    [getAllWords]: (state, { payload: { word } }) => {
    /*  let statecopy = {...state};
      statecopy.words = [...state.posts];
      statecopy.posts = post;

      return statecopy;*/
    },
  }, defaultState
);
