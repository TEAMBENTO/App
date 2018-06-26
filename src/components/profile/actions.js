import {
  PROFILE_LOAD,
  PROFILES_LOAD,
  PROFILE_ADD,
  PROFILE_UPDATE
} from './reducers';

import {
  getProfileById,
  postProfile,
  putProfile,
  getAllProfiles
} from '../../services/api';

export function loadProfile(id) {
  return {
    type: PROFILE_LOAD,
    payload: getProfileById(id)
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