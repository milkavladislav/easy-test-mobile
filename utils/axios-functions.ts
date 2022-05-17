import axios from "axios";
import { APIPath } from "./storage-keys";

export interface AxiosPostProps {
  path: string;
  data?: object;
  onError: (error: string) => void;
  onSuccess: (data: object) => void;
}

export const axiosPost = (path: string, onError = (error: string) => {}, onSuccess = (data: any) => {}, data?: object) => {
  console.log("post")

  console.log(data)
  console.log(APIPath.root + path)

  axios
    .post(APIPath.root + path, data)
    .then((res) => {
      console.log("Post result")
      const responseData = res.data;
      const isError = "error" in responseData;
      if (isError) {
        onError(responseData.error);
      } else {
        onSuccess(responseData);
      }
    })
    .catch((error) => {
      onError(error)
    });
};

export const axiosGet = (path: string, onError = (error: string) => {}, onSuccess = (data: any) => {}, data?: object) => {
    axios
      .get(APIPath.root + path, data)
      .then((res) => {
        
        const responseData = res.data;
        if(responseData === null){
          onError("Response is null");
        } else {
          console.log("Response data")
          console.log(responseData)
          const isError = responseData == null || "error" in responseData;
          console.log(res.status)
  
          if (isError) {
            onError(responseData.error);
          } else {
            onSuccess(responseData);
          }
        }
        
      })
      .catch((error) => onError(error));
  };
