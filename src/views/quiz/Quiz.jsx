import { useState } from 'react';
import QuizCreation from './QuizCreation';
import QuizAnswers from './QuizAnswers';

export default function Quiz() {
  const [triviaQuestions, setTriviaQuestions] = useState([]);

  return (
    <main>
      <h1>QUIZ MAKER</h1>
      <QuizCreation setTriviaQuestions={setTriviaQuestions} />
      <QuizAnswers triviaQuestions={triviaQuestions} setTriviaQuestions={setTriviaQuestions} />
    </main>
  );
};
