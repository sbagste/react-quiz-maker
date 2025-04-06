import useTriviaQuestions from './hooks/useTriviaQuestions';
import QuizCreation from './QuizCreation';
import QuizAnswers from './QuizAnswers';

export default function Quiz() {
  const { triviaQuestions, setTriviaQuestions, toggleAnswer } = useTriviaQuestions();

  return (
    <main className='container'>
      <h1>QUIZ MAKER</h1>
      <QuizCreation setTriviaQuestions={setTriviaQuestions} />
      <QuizAnswers triviaQuestions={triviaQuestions} toggleAnswer={toggleAnswer} />
    </main>
  );
};
