export const BASE_API = process.env.NODE_ENV === 'development' ? 'http://localhost:3002' : 'http://example.com';
export const LOGIN = '/login/users/';
export const USERS = '/users/';
export const USER_SELF = '/users/self';

export const COMMON_ERROR = 'Information not found!';
export const AUTH_KEY = 'axe';

export const formatResposne = (r) => (r.status === 200 ? { user: r.data } : { message: r.message ? r.message : COMMON_ERROR });

export const formatError = (e) => ({ message: e.response ? e.response.data ? e.response.data.message ? e.response.data.message : COMMON_ERROR : COMMON_ERROR : COMMON_ERROR });
