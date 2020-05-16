import axios from 'axios';

import { useBoardState } from 'hooks/state/useBoardState';

const SERVER_BASE = 'http://localhost:8080';
const API_BASE = `${SERVER_BASE}/api/`;

const useApi = () => {
  const { clearBoardNameLocalStorage } = useBoardState();

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        clearBoardNameLocalStorage();
      }
      return Promise.reject(error);
    }
  );

  const enhanceParams = (params) => ({
    ...params,
    withCredentials: true,
  });

  const get = (location, success, error, params) => {
    axios.get(API_BASE + location, enhanceParams(params)).then(success, error);
  };

  const post = (location, body, success, error, params) => {
    axios
      .post(API_BASE + location, body, enhanceParams(params))
      .then(success, error);
  };

  const put = (location, body, success, error, params) => {
    axios
      .put(API_BASE + location, body, enhanceParams(params))
      .then(success, error);
  };

  const remove = (location, success, error, params) => {
    axios
      .delete(API_BASE + location, enhanceParams(params))
      .then(success, error);
  };

  const login = (creds, success, error) => {
    const formData = new FormData();
    formData.append('username', creds.boardName);
    formData.append('password', creds.boardKey);
    axios
      .post(`${SERVER_BASE}/login`, formData, enhanceParams({}))
      .then(success, error);
  };

  const logout = (success, error) => {
    axios.get(`${SERVER_BASE}/logout`, enhanceParams({})).then(success, error);
  };

  return {
    get,
    post,
    put,
    remove,
    login,
    logout,
  };
};

export { useApi };
