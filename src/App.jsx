import { useEffect, useState } from 'react';
import { fetchAllCategories } from './service/category-service';

const DIFFICULTY_OPTIONS = [
  {id: 1, value: 'easy', name: 'Easy'},
  {id: 2, value: 'medium', name: 'Medium'},
  {id: 3, value: 'hard', name: 'Hard'}
];

function App() {
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    async function fetch() {
      const _categories = await fetchAllCategories();
      setCategoryOptions(_categories);
    }
    fetch();
  }, []);

  return (
    <main className='main-layout'>
      <h1>QUIZ MAKER</h1>
      <form>
        <fieldset role='group'>
          <select id='categorySelect' name='categories' required>
            <option value=''>Select a category</option>
            {categoryOptions.length > 0 && categoryOptions.map(category => {
              return <option key={category.id} value={category}>{category.name}</option>
            })}
          </select>

          <select id='difficultySelect' name='difficulties' required>
            <option value=''>Select difficulty</option>
            {DIFFICULTY_OPTIONS.map(difficulty => {
              return <option key={difficulty.id} value={difficulty.value}>{difficulty.name}</option>
            })}
          </select>

          <button id='createBtn' type='submit'>Create</button>
        </fieldset>
      </form>
    </main>
  );
}

export default App;
