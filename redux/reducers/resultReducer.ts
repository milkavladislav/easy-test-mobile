import isEmpty from "../validation/is-empty";
import { GET_RESULTS, SET_ALL_ABOUT, SET_CURRENT_USER, SET_RESULT } from "../types";

const initialState = {
  results: [],
  testsAbout: [],
};

export default function resultReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_RESULT:
      return {
        ...state,
        results: action.payload,
      };
    case SET_ALL_ABOUT:
      let test = action.payload;
      let testsAbout: any[] = [...state.testsAbout];
      testsAbout.push({
        id: test.id,
        title: test.title
      });
      return {
        ...state,
        testsAbout: testsAbout
      };
    default:
      return state;
  }
}
