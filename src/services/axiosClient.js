import queryString from 'query-string';
import axios from "axios";
import { access_Token, API_URL } from "../constants/index.js";

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'content-type': 'application/json',
  },

  paramsSerializer: params => queryString.stringify(params),
});


axiosClient.interceptors.request.use((config) => {
  const info = JSON.parse(localStorage.getItem("persist:auth"));
  const token = info.token.replace(/"/g, '')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

axiosClient.interceptors.response.use((response) => {
  if (response && response.data) {
    if (response.data.status === '400') {
      throw response.data;
    }
    return response.data;
  }
  return response;
}, (error) => {
  if (error.data) {
    return error.data;
  }
  throw error;
});
export default axiosClient;
