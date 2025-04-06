import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router';
import Quiz from '@views/quiz/Quiz.jsx';
import Results from '@views/results/Results';
import './style.scss';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path='/' element={<Quiz />} />
        <Route path='/results' element={<Results />} />
      </Routes>
    </HashRouter>
  </StrictMode>
);
