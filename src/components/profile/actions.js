import {
  PROFILE_LOAD,
  PROFILES_LOAD,
  PROFILE_ADD,
  PROFILE_UPDATE,
  PROFILE_LOGIN_LOAD,
  USER_PROFILE_LOAD
} from './reducers';

import {
  getProfileById,
  postProfile,
  putProfile,
  getAllProfiles,
  getProfileByUser, 
  getCurrentProfileByUser,
} from '../../services/api';

export function loadProfile(id) {
  return {
    type: PROFILE_LOAD,
    payload: getProfileById(id)
  };
}

export function loadUserProfile(id) {
  return {
    type: USER_PROFILE_LOAD,
    payload: getCurrentProfileByUser(id)
  };
}

export function loadProfiles() {
  return {
    type: PROFILES_LOAD,
    payload: getAllProfiles()
  };
}

export function addProfile(profile) {
  return {
    type: PROFILE_ADD,
    payload: postProfile(profile)
  };
}

export function updateProfile(profile) {
  return {
    type: PROFILE_UPDATE,
    payload: putProfile(profile)
  };
}

export function queryProfile(userId) {
  return {
    type: PROFILE_LOGIN_LOAD,
    payload: getProfileByUser(userId)
  };
}