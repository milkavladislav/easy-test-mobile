import isEmpty from "../validation/is-empty";
import { CONNECT_TO_TEST, GET_TEST, SET_ABOUT, SET_QUESTIONS,  } from "./../types";

const initialState = {
  isTestNow: false,
  currentTestInformation: {},
  currentTestQuestions: [],
  currentTestAbout: {},
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
      };
    default:
      return state;
  }
}
