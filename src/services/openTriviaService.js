import axios from 'axios';

const URL = 'https://opentdb.com/api.php';

/**
 * returns the four answers of a single question, with isSelected and isCorrect flags added, shuffled in random order
 * @param {object} question 
 * @returns {array}
 */
function mapAnswers(question) {
  return question.incorrect_answers
    .map(answer => ({
      value: answer,
      isSelected: false,
      isCorrect: false,
      order: Math.random()
    }))
    .concat([{
      value: question.correct_answer,
      isSelected: false,
      isCorrect: true,
      order: Math.random()
    }])
    .sort((a, b) => a.order - b.order) // answers order should be in a random order
    .map((answer, index) => ({
      id: index + 1, // no 0 index
      value: answer.value,
      isSelected: answer.isSelected,
      isCorrect: answer.isCorrect
    }));
};

/**
 * Returns questions mapped with isSelected and isCorrect flags added to each answers
 * @param {array} input 
 * @returns {array}
 */
function mapTriviaQuestions(input) {
  return input.map((question, index) => ({
    id: index + 1, // no 0 index
    question: question.question,
    answers: mapAnswers(question),
  }));
};

/**
 * Returns a list of trivia questions
 * @param {string} category 
 * @param {'easy'|'medium'|'hard'} difficulty 
 * @param {number} amount 
 * @returns {array}
 */
export async function fetchTriviaByCategoryAndDifficultyAndAmount(category, difficulty, amount) {
  const res = await axios.get(URL, { params: { amount, category, difficulty, type: 'multiple' } });
  if (res.status !== 200 || res.data?.response_code !== 0) {
    console.error('Error fetching trivia questions');
    return [];
  }
  return mapTriviaQuestions(res.data?.results);
};
