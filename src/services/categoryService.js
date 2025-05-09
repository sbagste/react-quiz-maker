import axios from 'axios';

const URL = 'https://opentdb.com/api_category.php';

/**
 * returns available trivia categories
 * @returns {array<string>}
 */
export async function fetchAllCategories() {
  const res = await axios.get(URL);
  if (res.status !== 200) {
    console.error('Error fetching categories');
    return [];
  }
  return res.data?.trivia_categories;
};
