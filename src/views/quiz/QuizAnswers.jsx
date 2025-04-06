import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import TriviaQuestion from '@components/TriviaQuestion';

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
        triviaQuestions.map(triviaQuestion => (
          <TriviaQuestion
            key={triviaQuestion.id}
            triviaQuestion={triviaQuestion}
            style={(answer) => ['btn-answer', { 'btn-is-selected': answer.isSelected }]}
            onClick={(triviaQuestion, answer) => toggleAnswer(triviaQuestion.id, answer.id, !answer.isSelected)}
          />
        ))
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
