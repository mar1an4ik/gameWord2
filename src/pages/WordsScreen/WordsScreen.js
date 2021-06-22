import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { toast, ToastContainer } from "react-toastify";

import "./wordsScreen.scss";
import "react-toastify/dist/ReactToastify.min.css";
import { BulbOff, BulbOn, NextIcon, PreviousIcon } from "../../assets/icons/paginationIcons";
import { restartGame, setAnswer } from "../../actions";

const WordsScreen = () => {
  const answers = useSelector((state) => state.mainTree.answers);
  const dispatch = useDispatch();
  const [questionNumber, setQuestionNumber] = useState(0);
  const questions = ["1.Who?", "2.What?", "3.When?", "4.Where?"];
  const [inputAnswer, setInputAnswer] = useState("");
  const [isGameFinished, setGameFinished] = useState(false);
  const isCurrentAnswered = !!answers[questionNumber];
  const isAllAnswered = !answers.filter((answer) => answer === "").length;
  const textInput = React.createRef();

  useEffect(() => {
    textInput?.current?.focus(); //autofocus input
  });

  const getPreviousQuestion = () => {
    setQuestionNumber(questionNumber - 1);
  };

  const getNextQuestion = () => {
    setQuestionNumber(questionNumber + 1);
  };

  const finishGame = () => {
    if (!isAllAnswered) {
      toast.error("Please answer all questions");
      return;
    }
    setGameFinished(true);
  };

  const answerQuestion = () => {
    dispatch(setAnswer(questionNumber, inputAnswer));
    setInputAnswer("");
    if (questionNumber !== 3) {
      getNextQuestion();
    }
  };

  const updateAnswer = event => {
    setInputAnswer(event.target.value);
  };

  const tryAgain = () => {
    dispatch(restartGame());
    setQuestionNumber(0);
    setGameFinished(false);
  };

  const renderIndicators = () => {
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

  const renderQuestionsCard = () => {
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
            {answers.join(" ")}
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
