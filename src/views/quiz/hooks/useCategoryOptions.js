import { useEffect, useState } from 'react';
import { fetchAllCategories } from '@services/categoryService';

/**
 * returns list of available categories
 * @returns {array<string>}
 */
export default function useCategoryOptions() {
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    async function fetch() {
      const _categories = await fetchAllCategories();
      setCategoryOptions(_categories);
    }
    fetch();
  }, []);

  return categoryOptions;
};
