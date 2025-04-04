import { useEffect, useRef, useState } from 'react';
import { fetchAllCategories } from './service/category-service';
import { fetchTriviaByCategoryAndDifficultyAndAmount } from './service/open-trivia-service';

const DIFFICULTY_OPTIONS = [
  {id: 1, value: 'easy', name: 'Easy'},
  {id: 2, value: 'medium', name: 'Medium'},
  {id: 3, value: 'hard', name: 'Hard'}
];

function App() {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [triviaQuestions, setTriviaQuestions] = useState([]);

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

  function handleOnClick(questionId, answerId, isSelected) {
    setTriviaQuestions(prevState => {
      const _state = [...prevState];
      _state[_state.findIndex(s => s.id === questionId)].answers = _state[_state.findIndex(s => s.id === questionId)].answers.map(answer => {
        return answer.id === answerId ? { ...answer, isSelected } : { ...answer, isSelected: false };
      });
      return _state;
    });
  };

  function allQuestionsAnswered() {
    const areAllQuestionsAnswered = !triviaQuestions.some(question => {
      return !question.answers.some(answer => answer.isSelected);
    });
    return areAllQuestionsAnswered;
  };

  function handleSubmitAnswers() {
    console.log('Submitting');
  };

  return (
    <main className='main-layout'>
      <h1>QUIZ MAKER</h1>
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

      <form onSubmit={handleSubmitAnswers}>
        {
          triviaQuestions.length > 0 && triviaQuestions.map(triviaQuestion => {
            return (
              <div className='container' key={triviaQuestion.id}>
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
          })
        }
        {
          allQuestionsAnswered() && <button id='submitBtn' type='submit'>submit</button>
        }
      </form>
    </main>
  );
}

export default App;
