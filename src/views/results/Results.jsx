import { Link } from 'react-router';
import PropTypes from 'prop-types';
import TriviaQuestion from '@components/TriviaQuestion';
import useResults from './hooks/useResults';

export default function Results() {
  const { triviaQuestions, score, resultColor } = useResults();

  return (
    <main className='container'>
      <h1>RESULTS</h1>
      
      <div>
        {
          triviaQuestions.map(triviaQuestion => (
            <TriviaQuestion
              key={triviaQuestion.id}
              triviaQuestion={triviaQuestion}
              style={(answer) => [
                'btn-answer btn-no-hover',
                { 'btn-is-selected': answer.isCorrect, 'btn-is-wrong': answer.isSelected && !answer.isCorrect }
              ]}
            />
          ))
        }
      </div>

      <article className={resultColor}>
        You scored {score} out of {triviaQuestions.length}
      </article>

      <Link to='/'><button id='newQuizBtn' type='button' className='outline full-width'>Create a new quiz</button></Link>
    </main>
  );
};
