import isEmpty from "../validation/is-empty";
import {
  CONNECT_TO_TEST,
  GET_TEST,
  SET_ABOUT,
  SET_QUESTIONS,
  UPDATE_TEST_PROGRESS_LOCAL,
} from "./../types";

const initialState = {
  isTestNow: false,
  currentTestInformation: {},
  currentTestQuestions: [],
  currentTestAbout: {},
  testPassing: [],
};

export default function testReducer(state = initialState, action: any) {
  switch (action.type) {
    case CONNECT_TO_TEST:
      return {
        ...state,
        isTestNow: !isEmpty(action.payload),
        currentTestInformation: action.payload,
      };
    case SET_ABOUT:
      return {
        ...state,
        currentTestAbout: action.payload,
      };
    case SET_QUESTIONS:
      return {
        ...state,
        currentTestQuestions: action.payload,
        testPassing: action.payload.map(
          (question: {
            id: number;
            json_answers: {
              checked: boolean;
            }[];
          }) => {
            return {
              id: question.id,
              oneAnswer:
                question.json_answers.filter((answer: { checked: boolean }) => {
                  return answer.checked;
                }).length === 1,
              answers: question.json_answers.map(
                (answer: {}, index: number) => {
                  return {
                    id: index,
                    checked: false,
                  };
                }
              ),
            };
          }
        ),
      };
    case UPDATE_TEST_PROGRESS_LOCAL:
      return {
        ...state,
        testPassing: state.testPassing.map(
          (question: { id: number; oneAnswer: boolean; answers: [] }) => {
            if (question.id !== action.payload.questionId) return question;
            return {
              id: question.id,
              oneAnswer: question.oneAnswer,
              answers: question.answers.map(
                (answer: { id: number; checked: boolean }) => {
                  if (!question.oneAnswer) {
                    console.log( answer.id)
                    if (answer.id === action.payload.answerId) {
                      return {
                        id: answer.id,
                        checked:  !answer.checked,
                      };
                    }
                    return answer;
                  }
                  if (answer.id !== action.payload.answerId) {
                    return {
                      id: answer.id,
                      checked: false,
                    };
                  }
                  return {
                    id: answer.id,
                    checked: !answer.checked,
                  };
                }
              ),
            };
          }
        ),
      };
    default:
      return state;
  }
}
