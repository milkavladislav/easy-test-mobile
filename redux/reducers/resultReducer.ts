import isEmpty from "../validation/is-empty";
import {
  ACTIVITY_ID_TEST_ID,
  CONTINUE_TEST,
  SET_ALL_ABOUT,
  SET_CURRENT_USER,
  SET_RESULT,
} from "../types";

const initialState = {
  results: [],
  testsAbout: [],
  activityIdTestId: [], // )))
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
        title: test.title,
      });
      let whiteTestsAbout = Array.from(new Set(testsAbout));
      return {
        ...state,
        testsAbout: whiteTestsAbout,
      };

    case ACTIVITY_ID_TEST_ID:
      let value = action.payload;
      let table: any[] = [...state.activityIdTestId];
      table.push(value);
      return {
        ...state,
        activityIdTestId: table,
      };
    default:
      return state;
  }
}
