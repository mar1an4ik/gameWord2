import { createActions } from "redux-actions";

export const { getAllWords } = createActions({
  GET_ALL_WORDS: (words) => ({ words }),
});
