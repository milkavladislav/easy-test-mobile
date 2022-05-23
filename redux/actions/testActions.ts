import {
  CLOSE_RESULT,
  COMPLETE_TEST,
  CONNECT_TO_TEST,
  CONTINUE_TEST,
  DELETE_ACTIVATE,
  DELETE_MY_TEST,
  LOADING,
  SET_ABOUT,
  SET_MY_TESTS,
  SET_QUESTIONS,
  SHOW_ALL_ACTIVITY_TEST,
  SHOW_MY_TEST,
  UPDATE_TEST_PROGRESS_LOCAL,
} from "./../types";
import { clearData } from "./../../utils/async-storage-functions";
import axios from "axios";
import { storeData } from "../../utils/async-storage-functions";
import { axiosGet, axiosPost } from "../../utils/axios-functions";
import { APIPath, StorageKey } from "../../utils/storage-keys";

import { GET_ERRORS, SET_CURRENT_USER } from "../types";

export const connectToTest =
  (code: string, onError: (error: string) => void) => (dispatch: any) => {
    axiosPost(
      APIPath.connect,
      (error) => {
        onError(error);
        console.log("Error: " + error);
        dispatch({
          type: GET_ERRORS,
          payload: error,
        });
      },
      (value) => {
        dispatch(getAboutTest(value.activate_id));
        dispatch({
          type: CONNECT_TO_TEST,
          payload: value,
        });
      },
      {
        code: code,
      }
    );
  };

export const getAboutTest = (id: number) => (dispatch: any) => {
  axiosPost(
    APIPath.getActivate,
    (error) => {
      console.log("Error: " + error);
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    },
    (value) => {
      console.log("getAboutTest");
      dispatch(getQuestions(value.testing_id));
      dispatch({
        type: SET_ABOUT,
        payload: value,
      });
    },
    {
      id: id,
    }
  );
};

export const getQuestions = (id: number) => (dispatch: any) => {
  axiosPost(
    APIPath.questions,
    (error) => {
      console.log("Error: " + error);
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    },
    (value) => {
      dispatch({
        type: SET_QUESTIONS,
        payload: value,
      });
    },
    {
      testing_id: id,
    }
  );
};

export const updateProgressLocal =
  (questionId: number, answerId: number) => (dispatch: any) => {
    dispatch({
      type: UPDATE_TEST_PROGRESS_LOCAL,
      payload: { questionId, answerId },
    });
  };

export const updateProgress =
  (answers: [], id: number, onSuccess: () => void) => (dispatch: any) => {
    let json_answers = answers.map((answer: { id: number; answers: [] }) => {
      return {
        id: answer.id,
        answers: answer.answers,
      };
    });

    axiosPost(
      APIPath.updateProgress,
      (error) => {
        console.log("Error: " + error);
        dispatch({
          type: GET_ERRORS,
          payload: error,
        });
      },
      () => {
        onSuccess();
      },
      {
        result_id: id,
        json_answers: json_answers,
      }
    );
  };

export const continueTest = (id: number) => (dispatch: any) => {
  axiosPost(
    APIPath.getResultById,
    (error) => {
      console.log("Error: " + error);
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    },
    (value) => {
      dispatch(getAboutTest(value.activate_id));
      setTimeout(() => {
        dispatch({
          type: CONTINUE_TEST,
          payload: value,
        });
      }, 500);
    },
    {
      result_id: id,
    }
  );
};

export const completeTest = (answers: [], id: number) => (dispatch: any) => {
  let json_answers = answers.map((answer: { id: number; answers: [] }) => {
    return {
      id: answer.id,
      answers: answer.answers,
    };
  });

  axiosPost(
    APIPath.completeTest,
    (error) => {
      console.log("Error: " + error);
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    },
    (value) => {
      console.log(value);
      dispatch({
        type: COMPLETE_TEST,
        payload: value,
      });
    },
    {
      result_id: id,
      json_answers: json_answers,
    }
  );
};

export const closeResult = () => (dispatch: any) => {
  dispatch({
    type: CLOSE_RESULT,
    payload: null,
  });
};

export const getMyTests = () => (dispatch: any) => {
  axiosPost(
    APIPath.allTests,
    (error) => {
      console.log("Error: " + error);
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    },
    (value) => {
      dispatch({
        type: SET_MY_TESTS,
        payload: value,
      });
    },
    {}
  );
};

export const getMyTest =
  (test: { title: string; id: number; description: string }) =>
  (dispatch: any) => {
    axiosPost(
      APIPath.questions,
      (error) => {
        console.log("Error: " + error);
        dispatch({
          type: GET_ERRORS,
          payload: error,
        });
      },
      (value) => {
        dispatch({
          type: SHOW_MY_TEST,
          payload: value,
          test: test,
        });
      },
      { testing_id: test.id }
    );
  };

export const deleteMyTest =
  (id: number, onSuccess: () => void) => (dispatch: any) => {
    axiosPost(
      APIPath.deleteTest,
      (error) => {
        console.log("Error: " + error);
        dispatch({
          type: GET_ERRORS,
          payload: error,
        });
      },
      () => {
        onSuccess();
        dispatch({
          type: DELETE_MY_TEST,
        });
      },
      { id: id }
    );
  };

export const showAllActivatesByTest = (id: number) => (dispatch: any) => {
  axiosPost(
    APIPath.allActivates,
    (error) => {
      console.log("Error: " + error);
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    },
    (value) => {
      dispatch({
        type: SHOW_ALL_ACTIVITY_TEST,
        payload: value,
      });
    },
    {
      test_id: id,
    }
  );
};

export const deleteActivate =
  (id: number, testId: number, onSuccess: () => void) => (dispatch: any) => {
    axiosPost(
      APIPath.deleteActivate,
      (error) => {
        console.log("Error: " + error);
        dispatch({
          type: GET_ERRORS,
          payload: error,
        });
      },
      () => {
        onSuccess();
        dispatch(showAllActivatesByTest(testId));
      },
      { id: id }
    );
  };
