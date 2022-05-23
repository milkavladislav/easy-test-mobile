import { CHANGE_NAME } from "./../types";
import { clearData } from "./../../utils/async-storage-functions";
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

export const registerUser =
  (email: string, name: string, password: string, onSuccess: () => void) => (dispatch: any) => {
    axiosPost(
      APIPath.registration,
      (error) => {
        console.log("error");
        console.log(error);
      },
      (text) => {
        onSuccess();
        console.log(text);
      },
      {
        email: email,
        name: name,
        password: password,
      }
    );
  };

  // export const restorePassword =
  // (email: string, onSuccess: () => void) => (dispatch: any) => {
  //   axiosPost(
  //     APIPath.,
  //     (error) => {
  //       console.log("error");
  //       console.log(error);
  //     },
  //     (text) => {
  //       onSuccess();
  //       console.log(text);
  //     },
  //     {
  //       email: email,
  //       name: name,
  //       password: password,
  //     }
  //   );
  // };

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

export const changeName =
  (newName: string, onSuccess: () => void) => (dispatch: any) => {
    console.log("act");
    axiosPost(
      APIPath.setName,
      (error) => {
        console.log("error");
        console.log(error);
      },
      () => {
        dispatch(getAboutUser());
        onSuccess();
      },
      {
        name: newName,
      }
    );
  };

export const changePassword =
  (oldPassword: string, newPassword: string, onSuccess: () => void, onError: (error: string) => void) =>
  (dispatch: any) => {
    axiosPost(
      APIPath.changePassword,
      (error) => {
        console.log("error");
        console.log(error);
        onError(error)
      },
      (value) => {
        console.log(value);
        onSuccess();
      },
      {
        oldPassword: oldPassword,
        password: newPassword,
      }
    );
  };

// Log user out
export const logoutUser = () => (dispatch: any) => {
  // Remove token from localStorage
  //localStorage.removeItem("jwtToken");

  axiosPost(
    APIPath.logout,
    (error) => {
      console.log("error");
      console.log(error);
    },
    (data) => {
      console.log(data);
    }
  );

  console.log("logout");
  clearData(StorageKey.user);
  dispatch(setCurrentUser(null));
};
