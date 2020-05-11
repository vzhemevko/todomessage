import axios from 'axios';

const SERVER_BASE = 'http://localhost:8080';
const API_BASE = `${SERVER_BASE}/api/`;

export default {
  get(location, success, error, params) {
    axios.get(API_BASE + location, params).then(success, error);
  },
  post(location, body, success, error, params) {
    axios.post(API_BASE + location, body, params).then(success, error);
  },
};