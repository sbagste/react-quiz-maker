import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import PropTypes from 'prop-types';
import { decode } from 'html-entities';

function Question({ triviaQuestion }) {
  return (
    <div className='container'>
      <p>{decode(triviaQuestion.question)}</p>
      <div>
        {
          triviaQuestion.answers.map(answer => {
            return <input
              key={answer.id}
              type='button'
              className={`btn-answer btn-no-hover ${answer.isCorrect ? 'btn-is-selected' : answer.isSelected && !answer.isCorrect ? 'btn-is-wrong' : ''}`}
              value={decode(answer.value)}
            />;
          })
        }
      </div>
    </div>
  );
};

Question.propTypes = {
  triviaQuestion: PropTypes.array
};

const COLOR_CLASS_BY_SCORE = {
  0: 'is-red',
  1: 'is-red',
  2: 'is-grey',
  3: 'is-grey',
  4: 'is-green',
  5: 'is-green'
};

export default function Results() {
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

  return (
    <main className='container'>
      <h1>RESULTS</h1>
      
      <div>
        {
          triviaQuestions.map(triviaQuestion => <Question key={triviaQuestion.id} triviaQuestion={triviaQuestion} />)
        }
      </div>

      <article className={resultColor}>
        You scored {score} out of {triviaQuestions.length}
      </article>

      <Link to='/'><button id='newQuizBtn' type='button' className='outline full-width'>Create a new quiz</button></Link>
    </main>
  );
};
