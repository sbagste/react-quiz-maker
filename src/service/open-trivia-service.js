import axios from 'axios';

const URL = 'https://opentdb.com/api.php';

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
    .sort((a, b) => a.order - b.order)
    .map((answer, index) => ({
      id: index + 1,
      value: answer.value,
      isSelected: answer.isSelected,
      isCorrect: answer.isCorrect
    }));
};

function mapTriviaQuestions(input) {
  return input.map((question, index) => ({
    id: index + 1,
    question: question.question,
    answers: mapAnswers(question),
  }));
};

export async function fetchTriviaByCategoryAndDifficultyAndAmount(category, difficulty, amount) {
  const res = await axios.get(URL, { params: { amount, category, difficulty, type: 'multiple' } });
  if (res.status !== 200 || res.data?.response_code !== 0) {
    console.error('Error fetching trivia questions');
    return [];
  }
  return mapTriviaQuestions(res.data?.results);
};
