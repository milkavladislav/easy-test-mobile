import {
  CONNECT_TO_TEST,
  SET_ABOUT,
  SET_QUESTIONS,
  UPDATE_TEST_PROGRESS_LOCAL,
} from "./../types";
import { clearData } from "./../../utils/async-storage-functions";
import axios from "axios";
import { storeData } from "../../utils/async-storage-functions";
import { axiosGet, axiosPost } from "../../utils/axios-functions";
import { APIPath, StorageKey } from "../../utils/storage-keys";

import { GET_ERRORS, SET_CURRENT_USER } from "../types";

export const connectToTest = (code: string) => (dispatch: any) => {
  axiosPost(
    APIPath.connect,
    (error) => {
      console.log("Error: " + error);
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    },
    (value) => {
      dispatch(getAboutTest(value.activate_id));
      dispatch(getQuestions(value.activate_id));
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
    APIPath.test,
    (error) => {
      console.log("Error: " + error);
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    },
    (value) => {
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

export const UpdateProgressLocal =
  (questionId: number, answerId: number) => (dispatch: any) => {
    dispatch({
      type: UPDATE_TEST_PROGRESS_LOCAL,
      payload: { questionId, answerId },
    });
  };

  export const UpdateProgress = (id: number) => (dispatch: any) => {
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

// // Set logged in user
// export const setCurrentTest = (test: any) => {
//   return {
//     type: SET_CURRENT_TEST,
//     payload: test,
//   };
// };
