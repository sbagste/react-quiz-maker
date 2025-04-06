import { Link } from 'react-router';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { decode } from 'html-entities';
import useResults from './hooks/useResults';

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
              className={classnames('btn-answer btn-no-hover', {
                'btn-is-selected': answer.isCorrect,
                'btn-is-wrong': answer.isSelected && !answer.isCorrect
              })}
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

export default function Results() {
  const { triviaQuestions, score, resultColor } = useResults();

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
