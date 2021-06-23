import { createAction } from "redux-actions";

export const setAnswer = createAction<setAnswerPayload, number, string>(
  "SET_ANSWER",
  (questionNumber, answer) => ({ questionNumber, answer }),
);
export const restartGame  = createAction(
  "RESTART_GAME"
 );

export type setAnswerPayload = {
  questionNumber : number,
  answer : string
};
