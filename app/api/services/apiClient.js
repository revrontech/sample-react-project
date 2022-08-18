import Axios from 'axios';
import models from '../dummy/models';
import { BASE_API, AUTH_KEY } from './apiConstants';

export const apiClient = Axios.create({
  baseURL: BASE_API
});

export const assignAuth = () => {
  models.user.auth_key = (window.localStorage.getItem(AUTH_KEY) ? window.localStorage.getItem(AUTH_KEY) : '');
  apiClient.defaults.headers.common.Authorization = 'Bearer ' + models.user.auth_key;
};

export const setAuth = (authKey) => {
  window.localStorage.setItem(AUTH_KEY, authKey);
  models.user.auth_key = authKey;
  apiClient.defaults.headers.common.Authorization = 'Bearer ' + models.user.auth_key;
};

export const clearAuth = () => {
  setAuth('');
  window.localStorage.clear();
};
