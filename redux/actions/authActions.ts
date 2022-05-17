import { clearData } from './../../utils/async-storage-functions';
import axios from "axios";
import { storeData } from "../../utils/async-storage-functions";
import { axiosGet, axiosPost } from "../../utils/axios-functions";
import { APIPath, StorageKey } from "../../utils/storage-keys";

import { GET_ERRORS, SET_CURRENT_USER } from "../types";


// Login - Get User Token
export const loginUser =
  (email: string, password: string) => (dispatch: any) => {
    axiosPost(
      APIPath.auth,
      (error) => {
        console.log("Error: " + error);
        dispatch({
          type: GET_ERRORS,
          payload: error,
        });
      },
      (value) => {
        dispatch(getAboutUser());
      },
      {
        email: email,
        password: password,
      }
    );
  };

// get information about user
  export const getAboutUser = () => (dispatch: any) => {
    axiosPost(
      APIPath.user,
      (error) => {
        console.log("Error: " + error);
        dispatch({
          type: GET_ERRORS,
          payload: error,
        });
      },
      (value) => {
        console.log("getAboutUser")
        console.log(value)
        storeData(StorageKey.user, value);
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
