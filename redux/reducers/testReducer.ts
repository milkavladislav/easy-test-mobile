import isEmpty from "../validation/is-empty";
import {
  CLEAR_ALL,
  CLOSE_RESULT,
  COMPLETE_TEST,
  CONNECT_TO_TEST,
  CONTINUE_TEST,
  DELETE_ACTIVATE,
  DELETE_MY_TEST,
  LOADING,
  SAVE_TEST,
  SET_ABOUT,
  SET_MY_TESTS,
  SET_QUESTIONS,
  SHOW_ALL_ACTIVITY_TEST,
  SHOW_MY_TEST,
  UPDATE_TEST_PROGRESS_LOCAL,
} from "./../types";

const initialState = {
  isTestNow: false,
  isResultNow: false,
  isLoading: false,
  currentTestInformation: {},
  currentTestQuestions: [],
  currentTestAbout: {},
  testPassing: [],
  testResult: {},

  myTests: [],
  isShowSomeTest: false,
  myCurrentTestAbout: {},
  myCurrentTestQuestions: [],
  myCurrentTestActivates: [],
};

export default function testReducer(state = initialState, action: any) {
  switch (action.type) {
    case CONNECT_TO_TEST:
      return {
        ...state,
        isLoading: false,
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
                    console.log(answer.id);
                    if (answer.id === action.payload.answerId) {
                      return {
                        id: answer.id,
                        checked: !answer.checked,
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
    case COMPLETE_TEST:
      return {
        ...state,
        isTestNow: false,
        isResultNow: true,
        testResult: action.payload,
      };
    case SAVE_TEST:
      return {
        ...state,
        isTestNow: false,
      };
    case CLOSE_RESULT:
      return {
        ...state,
        currentTestInformation: {},
        currentTestQuestions: [],
        currentTestAbout: {},
        testPassing: [],
        testResult: {},
        isResultNow: false,
      };
    case LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case SET_MY_TESTS:
      return {
        ...state,
        myTests: action.payload,
      };
    case CONTINUE_TEST:
      let testPassing = state.testPassing;
      return {
        ...state,
        isTestNow: true,
        currentTestInformation: action.payload,
        testPassing: testPassing.map(
          (question: { answers: []; id: number; oneAnswer: boolean }) => {
            return {
              oneAnswer: question.oneAnswer,
              id: question.id,
              answers: action.payload.json_answers.find(
                (q: { id: number; answers: [] }) => {
                  return question.id === q.id;
                }
              )?.answers,
            };
          }
        ),
      };
    case SHOW_MY_TEST:
      return {
        ...state,
        isShowSomeTest: true,
        myCurrentTest: action.test,
        myCurrentTestQuestions: action.payload,
      };

    case SHOW_ALL_ACTIVITY_TEST:
      return {
        ...state,
        myCurrentTestActivates: action.payload,
      };
    case DELETE_MY_TEST:
      return {
        ...state,
        isShowSomeTest: false,
        myCurrentTestAbout: {},
        myCurrentTestQuestions: [],
      };
    case CLEAR_ALL:
      return {
        ...state,
        isShowSomeTest: false,
        isTestNow: false,
        isResultNow: false,
        isLoading: false,
      };
    case DELETE_ACTIVATE:
      return {
        ...state,
        isShowSomeTest: false,
        myCurrentTestAbout: {},
        myCurrentTestQuestions: [],
      };
    default:
      return state;
  }
}
