import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from 'react-bootstrap';

const WordsScreen = props => {
  const words = useSelector((state) => state.mainTree.words);
  const dispatch = useDispatch();
  const [questionNumber, setQuestionNumber] = useState(0);
  const questions = ["Who?", "What?", "When?", "Where?"]
  return (
    <div className="words-screen">
      <div className="card text-center">
        <div className="card-header">
          Featured
        </div>
        <div className="card-body">
          <h5 className="card-title">        {questions[questionNumber]}</h5>
          <input type="text"/>
          <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
        <div className="card-footer text-muted">
          {questionNumber}
        </div>
      </div>
    </div>
  );
};

export default WordsScreen;
