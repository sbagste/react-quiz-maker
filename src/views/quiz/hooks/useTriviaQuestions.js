import { useReducer } from 'react';
import triviaQuestionsReducer, { TRIVIA_QUESTIONS_REDUCER_ACTIONS } from '@reducers/triviaQuestionsReducer';

export default function useTriviaQuestions() {
  const [triviaQuestions, dispatch] = useReducer(triviaQuestionsReducer, []);

  function setTriviaQuestions(triviaQuestions) {
    dispatch({ type: TRIVIA_QUESTIONS_REDUCER_ACTIONS.CREATE, triviaQuestions });
  };

  function toggleAnswer(questionId, answerId, isSelected) {
    dispatch({ type: TRIVIA_QUESTIONS_REDUCER_ACTIONS.TOGGLE_ANSWER, questionId, answerId, isSelected });
  };

  return {
    triviaQuestions,
    setTriviaQuestions,
    toggleAnswer
  };
};
