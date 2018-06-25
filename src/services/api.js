
import { get, post } from './request';

const URL = '/api';
const PROFILES_URL = `${URL}/profiles`;
const GROUPS_URL = `${URL}/groups`;
const EVENTS_URL = `${URL}/events`;
const AUTH_URL = `${URL}/auth`;

export const getAllGroups = () => get(GROUPS_URL);