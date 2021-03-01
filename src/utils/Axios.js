import axios from "axios";
import { BASE_API_URL } from "../constants/api";
import { alertError, alertSuccess } from "./Toast";

const AxiosUtil = axios.create({
  baseURL: BASE_API_URL,
});

AxiosUtil.interceptors.response.use(
  function (response) {
    alertSuccess(response.data);
    return response;
  },
  function (error) {
    if (axios.isCancel(error)) {
      throw error;
    }
    alertError(error);
    if (error.response) {
      if (error.response.status === 401) {
      }
    }
    return Promise.reject(error);
  }
);

export async function authGet(url, params = {}) {
  return await AxiosUtil.get(url, { params });
}
export async function authPut(url, params = {}) {
  return await AxiosUtil.put(url, params);
}

export async function authPatch(url, params = {}) {
  return await AxiosUtil.patch(url, params);
}

export async function authPost(url, params = {}) {
  return await AxiosUtil.post(url, params);
}

export async function authDelete(url) {
  return await AxiosUtil.delete(url);
}

export default AxiosUtil;
