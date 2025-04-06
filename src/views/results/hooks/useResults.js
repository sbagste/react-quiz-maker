import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

const COLOR_CLASS_BY_SCORE = {
  0: 'is-red',
  1: 'is-red',
  2: 'is-grey',
  3: 'is-grey',
  4: 'is-green',
  5: 'is-green'
};

export default function useResults() {
  const { state } = useLocation();
  const [triviaQuestions, setTriviaQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [resultColor, setResultColor] = useState('');

  useEffect(() => {
    if (state) {
      setTriviaQuestions(state);
      const _score = state.reduce((acc, question) => {
        return acc + question.answers.some(answer => answer.isSelected && answer.isCorrect);
      }, 0);
      setScore(_score);
      setResultColor(COLOR_CLASS_BY_SCORE[_score]);
    };
  }, [state]);

  return {
    triviaQuestions,
    score,
    resultColor
  };
};
