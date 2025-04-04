import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Quiz from '@views/quiz/Quiz.jsx';
import './style.scss';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Quiz />
  </StrictMode>
);
