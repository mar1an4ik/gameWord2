import { createActions } from "redux-actions";

export const { setAnswer } = createActions({
  SET_ANSWER: (questionNumber, answer) => ({ questionNumber, answer }),
});
export const { restartGame } = createActions({
  RESTART_GAME: () => ({}),
});
