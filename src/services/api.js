
import { get, post } from './request';

const URL = '/api';
// const PROFILES_URL = `${URL}/profiles`;
// const GROUPS_URL = `${URL}/groups`;
// const EVENTS_URL = `${URL}/events`;
const AUTH_URL = `${URL}/auth`;

export const getAllGroups = () => get(GROUPS_URL);
export const postGroup = group => post(GROUPS_URL, group);
export const signin = credentials => post(`${AUTH_URL}/signin`, credentials);
export const signup = credentials => post(`${AUTH_URL}/signup`, credentials);

export const verifyUser = token => get(`${AUTH_URL}/verify`, { 
  headers: {
    Authorization: token
  }
});

