import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { toast, ToastContainer } from "react-toastify";

import "./wordsScreen.scss";
import "react-toastify/dist/ReactToastify.min.css";
import { BulbOff, BulbOn, NextIcon, PreviousIcon } from "../../assets/icons/paginationIcons";
import {restartGame, setAnswer} from "../../actions";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {RootState} from '../../store/store';

const WordsScreen = () => {

  const answers = useAppSelector((state: RootState) => state.mainTree.answers);
  const dispatch = useAppDispatch();
  const [questionNumber, setQuestionNumber] = useState(0);
  const questions = ["1.Who?", "2.What?", "3.When?", "4.Where?"];
  const [inputAnswer, setInputAnswer] = useState("");
  const [isGameFinished, setGameFinished] = useState(false);
  const isCurrentAnswered = !!answers[questionNumber];
  const isAllAnswered = !answers.filter((answer) => answer === "").length;
  const textInput = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    textInput?.current?.focus(); //autofocus input
  });

  const getPreviousQuestion = () : void => {
    setQuestionNumber(questionNumber - 1);
  };

  const getNextQuestion = () : void => {
    setQuestionNumber(questionNumber + 1);
  };

  const finishGame = () : void => {
    if (!isAllAnswered) {
      toast.error("Please answer all questions");
      return;
    }
    setGameFinished(true);
  };

  const answerQuestion = () : void => {
    dispatch(setAnswer(questionNumber, inputAnswer));
    setInputAnswer("");
    if (questionNumber !== 3) {
      getNextQuestion();
    }
  };

  const updateAnswer = (event: { target: { value: React.SetStateAction<string>; }; }) : void => {
    setInputAnswer(event.target.value);
  };

  const tryAgain = () : void => {
    dispatch(restartGame());
    setQuestionNumber(0);
    setGameFinished(false);
  };

  const renderIndicators = () : Array<object> => {
    let indicators = [];
    for (let i = 0; i < 4; i++) {
      if (answers[i]) {
        indicators.push(
          <BulbOn
            key={i}
            fill={"orange"}
            className={classNames("bulb", { "active": i === questionNumber })}
            onClick={() => setQuestionNumber(i)}
          />);
      } else {
        indicators.push(
          <BulbOff
            key={i}
            className={classNames("bulb", { "active": i === questionNumber })}
            onClick={() => setQuestionNumber(i)}
          />);
      }
    }

    return indicators;
  };

  const renderQuestionsCard = ()  => {
    return (
      <div className="card text-center">
        <div className="card-header">
          Create your sentence!
        </div>
        <div className="card-body">
          <h5 className="card-title">{questions[questionNumber]}</h5>
          <input
            ref={textInput}
            disabled={isCurrentAnswered}
            type="text"
            value={isCurrentAnswered ? answers[questionNumber] : inputAnswer}
            onChange={updateAnswer}
          />
          <div>
            <button
              disabled={isCurrentAnswered}
              className="btn btn-primary btn-answer"
              onClick={answerQuestion}
            >
              Answer
            </button>
            <button
              className="btn btn-primary btn-answer"
              onClick={finishGame}
            >
              Finish
            </button>
            <div className="indicators">
              {
                renderIndicators()
              }
            </div>
          </div>
        </div>
        <div className="card-footer text-muted">
          <PreviousIcon
            className={classNames("pagin-icon", { " disabled": questionNumber === 0 })}
            onClick={getPreviousQuestion}
            fill={"green"}
          />
          <i className="question-number"> {questionNumber + 1} / 4 </i>
          <NextIcon
            className={classNames("pagin-icon", { " disabled": questionNumber === 3 })}
            onClick={getNextQuestion}
            fill={"green"}
          />
        </div>
      </div>
    )
  };

  const renderResultCard = () => {
    return (
      <div className="card text-center">
        <div className="card-header">
          Create your sentence!
        </div>
        <div className="card-body">
          <h5 className="card-title">
            {answers[0] + answers[1] + answers[3] + answers[2]}
          </h5>
          <button
            className="btn btn-primary btn-answer"
            onClick={tryAgain}
          >
            Try again!
          </button>
        </div>
      </div>
    )
  };

  return (
    <div className="words-screen">
      {isGameFinished
        ? renderResultCard()
        : renderQuestionsCard()
      }
      <ToastContainer/>
    </div>
  );
};

export default WordsScreen;
