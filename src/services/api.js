
import { get, post, put, del } from './request';

const URL = '/api';
const USERS_URL = `${URL}/users`;
const PROFILES_URL = `${URL}/profiles`;
const GROUPS_URL = `${URL}/groups`;
const EVENTS_URL = `${URL}/events`;
const AUTH_URL = `${URL}/auth`;

export const getProfileByUser = id => get(`${PROFILES_URL}?userId=${id}`);
export const getCurrentProfileByUser = id => get(`${PROFILES_URL}/${id}`);
export const putProfile = profile => put(`${PROFILES_URL}/${profile._id}`, profile);
export const getAllProfiles = () => get(`${PROFILES_URL}`);
export const getProfileById = id => get(`${PROFILES_URL}/${id}`);
export const postProfile = profile => post(PROFILES_URL, profile);

export const getAllGroups = () => get(GROUPS_URL);
export const getGroupById = id => get(`${GROUPS_URL}/${id}`);
export const postGroup = group => post(GROUPS_URL, group);
export const putGroup = group => put(`${GROUPS_URL}/${group._id}`, group);
export const deleteGroup = id => del(`${GROUPS_URL}/${id}`, id);

export const getAllEvents = () => get(EVENTS_URL);
export const getEventById = id => get(`${EVENTS_URL}/${id}`);
export const postEvent = event => post(EVENTS_URL, event);
export const getEventByGroup = id => get(`${EVENTS_URL}?group=${id}`);
export const putEvent = event => put(`${EVENTS_URL}/${event._id}`, event);
export const deleteEvent = id => del(`${EVENTS_URL}/${id}`);


export const signin = credentials => post(`${AUTH_URL}/signin`, credentials);
export const signup = credentials => post(`${AUTH_URL}/signup`, credentials);
export const getUserProfile = id => get(`${USERS_URL}/${id}`);

export const verifyUser = token => get(`${AUTH_URL}/verify`, { 
  headers: {
    Authorization: token
  }
});

