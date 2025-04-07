import PropTypes from 'prop-types';
import { Link } from 'react-router';
import TriviaQuestion from '@components/TriviaQuestion';

export default function QuizAnswers({ triviaQuestions, toggleAnswer }) {
  function allQuestionsAnswered() {
    return !triviaQuestions.some(question => !question.answers.some(answer => answer.isSelected));
  };

  if (!triviaQuestions || triviaQuestions.length === 0) return null;

  return (
    <form>
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
        allQuestionsAnswered() &&
        <Link to={{ pathname: '/results' }} state={triviaQuestions}>
          <button id='submitBtn' type='submit'>Submit</button>
        </Link>
      }
    </form>
  );
};

QuizAnswers.propTypes = {
  triviaQuestion: PropTypes.array,
  toggleAnswer: PropTypes.func
};
