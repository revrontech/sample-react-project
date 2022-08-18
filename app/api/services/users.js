import { apiClient } from './apiClient';
import {
  USER_SELF, LOGIN, formatError, formatResposne, USERS
} from './apiConstants';

export const login = async (email, password) => {
  try {
    const { data } = await apiClient.post(LOGIN, { email, password });
    return formatResposne(data);
  } catch (e) {
    return { message: formatError(e) };
  }
};

export const getSelf = async () => {
  try {
    const { data } = await apiClient.get(USER_SELF);
    return formatResposne(data);
  } catch (e) {
    return { message: formatError(e) };
  }
};

export const getUsers = async () => {
  try {
    const { data } = await apiClient.get(USERS);
    return data;
  } catch (e) {
    return { message: formatError(e) };
  }
};

export const createUsers = async (userData) => {
  try {
    const { data } = await apiClient.post(USERS, userData);
    return data;
  } catch (e) {
    return { message: formatError(e) };
  }
};

export const updateUsers = async (userData) => {
  try {
    const { data } = await apiClient.put(USERS + userData.id, userData);
    return data;
  } catch (e) {
    return { message: formatError(e) };
  }
};
