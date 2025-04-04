import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchAllCategories } from '@service/category-service';
import { fetchTriviaByCategoryAndDifficultyAndAmount } from '@service/open-trivia-service';

const DIFFICULTY_OPTIONS = [
  {id: 1, value: 'easy', name: 'Easy'},
  {id: 2, value: 'medium', name: 'Medium'},
  {id: 3, value: 'hard', name: 'Hard'}
];

export default function QuizCreation({ setTriviaQuestions }) {
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    async function fetch() {
      const _categories = await fetchAllCategories();
      setCategoryOptions(_categories);
    }
    fetch();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const _triviaQuestions = await fetchTriviaByCategoryAndDifficultyAndAmount(data.get('categories'), data.get('difficulties'), 5);
    setTriviaQuestions(_triviaQuestions);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset role='group'>
        <select id='categorySelect' name='categories' defaultValue='' required>
          <option value='' disabled>Select a category</option>
          {
            categoryOptions.length > 0 && categoryOptions.map(category => {
              return <option key={category.id} value={category.id}>{category.name}</option>
            })
          }
        </select>

        <select id='difficultySelect' name='difficulties' defaultValue='' required>
          <option value='' disabled>Select difficulty</option>
          {DIFFICULTY_OPTIONS.map(difficulty => {
            return <option key={difficulty.id} value={difficulty.value}>{difficulty.name}</option>
          })}
        </select>

        <button id='createBtn' type='submit'>Create</button>
      </fieldset>
    </form>
  );
};

QuizCreation.propTypes = {
  setTriviaQuestions: PropTypes.func
};
