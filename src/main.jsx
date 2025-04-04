import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router';
import './index.css';
import Quiz from '@views/quiz/Quiz.jsx';
import './style.scss';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path='/' element={<Quiz />} />
      </Routes>
    </HashRouter>
  </StrictMode>
);
