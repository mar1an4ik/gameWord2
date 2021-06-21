import { createSelector } from "reselect";

const wordsSelector = state => state.mainTree.words;


export {
  wordsSelector,
};
