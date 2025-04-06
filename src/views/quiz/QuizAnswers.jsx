import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { decode } from 'html-entities';

function Question({ triviaQuestion, toggleAnswer }) {
  return (
    <div className='container'>
      <p>{decode(triviaQuestion.question)}</p>
      <div>
        {
          triviaQuestion.answers.map(answer => {
            return <input
              key={answer.id}
              type='button'
              className={`btn-answer ${answer.isSelected ? 'btn-is-selected' : ''}`}
              value={decode(answer.value)}
              onClick={() => toggleAnswer(triviaQuestion.id, answer.id, !answer.isSelected)}
            />;
          })
        }
      </div>
    </div>
  );
};

Question.propTypes = {
  triviaQuestion: PropTypes.array,
  dispatch: PropTypes.func
};

export default function QuizAnswers({ triviaQuestions, toggleAnswer }) {
  const navigate = useNavigate();

  function allQuestionsAnswered() {
    return !triviaQuestions.some(question => !question.answers.some(answer => answer.isSelected));
  };

  function handleOnSubmit() {
    navigate('/results', { state: triviaQuestions });
  };

  if (!triviaQuestions || triviaQuestions.length === 0) return null;

  return (
    <form onSubmit={handleOnSubmit}>
      {
        triviaQuestions.map(triviaQuestion => <Question key={triviaQuestion.id} triviaQuestion={triviaQuestion} toggleAnswer={toggleAnswer} />)
      }
      {
        allQuestionsAnswered() && <button id='submitBtn' type='submit'>Submit</button>
      }
    </form>
  );
};

QuizAnswers.propTypes = {
  triviaQuestion: PropTypes.array,
  toggleAnswer: PropTypes.func
};
