import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

function Question({ triviaQuestion, setTriviaQuestions }) {
  function handleOnClick(questionId, answerId, isSelected) {
    setTriviaQuestions(prevState => {
      const _state = [...prevState];
      _state[_state.findIndex(s => s.id === questionId)].answers = _state[_state.findIndex(s => s.id === questionId)].answers.map(answer => {
        return answer.id === answerId ? { ...answer, isSelected } : { ...answer, isSelected: false };
      });
      return _state;
    });
  };

  return (
    <div className='container'>
      <p>{triviaQuestion.question}</p>
      <div>
        {
          triviaQuestion.answers.map(answer => {
            return <input
              key={answer.id}
              type='button'
              className={`btn-answer ${answer.isSelected ? 'btn-is-selected' : ''}`}
              value={answer.value}
              onClick={() => handleOnClick(triviaQuestion.id, answer.id, !answer.isSelected)}
            />;
          })
        }
      </div>
    </div>
  );
};

Question.propTypes = {
  triviaQuestion: PropTypes.array,
  setTriviaQuestions: PropTypes.func
};

export default function QuizAnswers({ triviaQuestions, setTriviaQuestions }) {
  const navigate = useNavigate();

  function allQuestionsAnswered() {
    const areAllQuestionsAnswered = !triviaQuestions.some(question => {
      return !question.answers.some(answer => answer.isSelected);
    });
    return areAllQuestionsAnswered;
  };

  function handleOnSubmit() {
    navigate('/results', { state: triviaQuestions });
  };

  if (triviaQuestions.length === 0) return null;

  return (
    <form onSubmit={handleOnSubmit}>
      {
        triviaQuestions.map(triviaQuestion => <Question key={triviaQuestion.id} triviaQuestion={triviaQuestion} setTriviaQuestions={setTriviaQuestions} />)
      }
      {
        allQuestionsAnswered() && <button id='submitBtn' type='submit'>Submit</button>
      }
    </form>
  );
};

QuizAnswers.propTypes = {
  triviaQuestion: PropTypes.array,
  setTriviaQuestions: PropTypes.func
};
