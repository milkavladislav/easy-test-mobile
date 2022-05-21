import { SET_ALL_ABOUT, SET_RESULT } from './../types';
import { clearData } from './../../utils/async-storage-functions';
import axios from "axios";
import { storeData } from "../../utils/async-storage-functions";
import { axiosGet, axiosPost } from "../../utils/axios-functions";
import { APIPath, StorageKey } from "../../utils/storage-keys";

import { GET_ERRORS, SET_CURRENT_USER } from "../types";


export const getResult =
  () => (dispatch: any) => {
    axiosPost(
      APIPath.results,
      (error) => {
        console.log("Error: " + error);
        dispatch({
          type: GET_ERRORS,
          payload: error,
        });
      },
      (value: []) => {
        value.forEach((result: {activate_id: number}) => {
          dispatch(getAboutTest(result.activate_id))
        })
        dispatch({
          type: SET_RESULT,
          payload: value,
        })
      },
      {}
    );
  };

  export const getAboutTest =
  (id: number) => (dispatch: any) => {
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
          type: SET_ALL_ABOUT,
          payload: value,
        });
      },
      {
        id: id
      }
    );
  };

// get information about user
  export const getAboutUser = () => (dispatch: any) => {
    axiosPost(
      APIPath.results,
      (error) => {
        console.log("Error: " + error);
        dispatch({
          type: GET_ERRORS,
          payload: error,
        });
      },
      (value) => {

        dispatch(setCurrentUser(value));
      },
      {}
    );
  };

// Set logged in user
export const setCurrentUser = (user: any) => {
  return {
    type: SET_CURRENT_USER,
    payload: user,
  };
};

// Log user out
export const logoutUser = () => (dispatch: any) => {
  // Remove token from localStorage
  //localStorage.removeItem("jwtToken");

  axiosGet(APIPath.logout,
  (error) => {
    console.log("error")
    console.log(error)
  },
  (data) => {
    console.log(data)
  })


  console.log("logout")
  clearData(StorageKey.user)
  dispatch(setCurrentUser(null));
};
