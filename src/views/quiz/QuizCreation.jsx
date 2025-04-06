import PropTypes from 'prop-types';
import Select from '@components/Select';
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
        <Select
          id='categorySelect'
          name='categories'
          customPlaceholder='Select a category'
          options={categoryOptions}
          required
        />

        <Select
          id='difficultySelect'
          name='difficulties'
          customPlaceholder='Select difficulty'
          options={DIFFICULTY_OPTIONS}
          required
        />

        <button id='createBtn' type='submit'>Create</button>
      </fieldset>
    </form>
  );
};

QuizCreation.propTypes = {
  setTriviaQuestions: PropTypes.func
};
