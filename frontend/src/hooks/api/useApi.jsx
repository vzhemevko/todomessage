import axios from 'axios';

import { useLoader } from 'hooks/common/useLoader';
import { useBoardState } from 'hooks/state/useBoardState';

const SERVER_BASE = 'http://localhost:8080';
const API_BASE = `${SERVER_BASE}/api/`;

const useApi = () => {
  const { setIsLoading } = useLoader();
  const { clearBoardNameLocalStorage } = useBoardState();

  axios.interceptors.request.use((config) => {
    config.withCredentials = true;
    setIsLoading(true);
    return config;
  });

  axios.interceptors.response.use(
    (response) => {
      setIsLoading(false);
      return response;
    },
    (error) => {
      setIsLoading(false);
      if (error.response?.status === 401) {
        clearBoardNameLocalStorage();
      }
      return Promise.reject(error);
    }
  );

  const get = (location, success, error, params) => {
    axios.get(API_BASE + location, params).then(success, error);
  };

  const post = (location, body, success, error, params) => {
    axios.post(API_BASE + location, body, params).then(success, error);
  };

  const put = (location, body, success, error, params) => {
    axios.put(API_BASE + location, body, params).then(success, error);
  };

  const remove = (location, success, error, params) => {
    axios.delete(API_BASE + location, params).then(success, error);
  };

  const login = (creds, success, error) => {
    const formData = new FormData();
    formData.append('username', creds.boardName);
    formData.append('password', creds.boardKey);

    axios.post(`${SERVER_BASE}/login`, formData).then(success, error);
  };

  const logout = (success, error) => {
    axios.get(`${SERVER_BASE}/logout`).then(success, error);
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
