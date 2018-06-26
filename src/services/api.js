
import { get, post, put, del } from './request';

const URL = '/api';
const PROFILES_URL = `${URL}/profiles`;
const GROUPS_URL = `${URL}/groups`;
// const EVENTS_URL = `${URL}/events`;
const AUTH_URL = `${URL}/auth`;

export const getProfileByUser = id => get(`${PROFILES_URL}?userId=${id}`);
export const putProfile = profile => put(`${PROFILES_URL}/${profile._id}`, profile);
export const getAllProfiles = () => get(`${PROFILES_URL}`);
export const getProfileById = id => get(`${PROFILES_URL}/${id}`);
export const postProfile = profile => post(PROFILES_URL, profile);
export const getAllGroups = () => get(GROUPS_URL);
export const getGroupById = id => get(`${GROUPS_URL}/${id}`);
export const postGroup = group => post(GROUPS_URL, group);
export const putGroup = group => put(`${GROUPS_URL}/${group._id}`, group);
export const deleteGroup = id => del(`${GROUPS_URL}/${id}`, id);
export const signin = credentials => post(`${AUTH_URL}/signin`, credentials);
export const signup = credentials => post(`${AUTH_URL}/signup`, credentials);

export const verifyUser = token => get(`${AUTH_URL}/verify`, { 
  headers: {
    Authorization: token
  }
});

