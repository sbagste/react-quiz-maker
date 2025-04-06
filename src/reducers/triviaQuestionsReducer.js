export const TRIVIA_QUESTIONS_REDUCER_ACTIONS = {
  CREATE: 'CREATE',
  TOGGLE_ANSWER: 'TOGGLE_ANSWER'
};

export default function triviaQuestionsReducer(state, action) {
  switch (action.type) {
    case TRIVIA_QUESTIONS_REDUCER_ACTIONS.CREATE: {
      return action.triviaQuestions;
    }
    case TRIVIA_QUESTIONS_REDUCER_ACTIONS.TOGGLE_ANSWER: {
      const _state = [...state];
      _state[_state.findIndex(s => s.id === action.questionId)].answers = _state[_state.findIndex(s => s.id === action.questionId)].answers.map(answer => {
        return answer.id === action.answerId ? { ...answer, isSelected: action.isSelected } : { ...answer, isSelected: false };
      });
      return _state;
    }
  }
};
