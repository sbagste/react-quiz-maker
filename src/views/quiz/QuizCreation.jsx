import PropTypes from 'prop-types';
import useCategoryOptions from './hooks/useCategoryOptions';
import useCreateQuiz from './hooks/useCreateQuiz';

const DIFFICULTY_OPTIONS = [
  {id: 1, value: 'easy', name: 'Easy'},
  {id: 2, value: 'medium', name: 'Medium'},
  {id: 3, value: 'hard', name: 'Hard'}
];

export default function QuizCreation({ setTriviaQuestions }) {
  const categoryOptions = useCategoryOptions();
  const handleSubmit = useCreateQuiz(setTriviaQuestions);

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
