import { fetchTriviaByCategoryAndDifficultyAndAmount } from '@service/openTriviaService';

/**
 * returns function handling quiz creation
 * @param {function} setTriviaQuestions 
 * @returns {function}
 */
export default function useCreateQuiz(setTriviaQuestions) {
  return async function (event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const _triviaQuestions = await fetchTriviaByCategoryAndDifficultyAndAmount(data.get('categories'), data.get('difficulties'), 5);
    setTriviaQuestions(_triviaQuestions);
  };
};
