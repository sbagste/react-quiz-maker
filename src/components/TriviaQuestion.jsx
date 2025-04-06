import PropTypes from 'prop-types';
import classnames from 'classnames';
import { decode } from 'html-entities';

/**
 * returns a question component displaying the four available answers
 * @param {object} props
 * @param {object} triviaQuestion
 * @param {function} style - this function receives answer as argument and should return an array of length equals 2
 *   first element should be a string of classes
 *   second element should be an object
 * @returns {React.ReactNode}
 */
export default function TriviaQuestion({ triviaQuestion, style, onClick = () => {} }) {
  return (
    <div className='container'>
      <p>{decode(triviaQuestion.question)}</p>
      <div>
        {
          triviaQuestion.answers.map(answer => {
            return <input
              key={answer.id}
              type='button'
              className={classnames(...style(answer))}
              value={decode(answer.value)}
              onClick={() => onClick(triviaQuestion, answer)}
            />;
          })
        }
      </div>
    </div>
  );
};

TriviaQuestion.propTypes = {
  triviaQuestion: PropTypes.array,
  style: PropTypes.func,
  onClick: PropTypes.func
};
