import {
  PROFILE_LOAD,
  PROFILE_ADD
} from './reducers';

import {
  getProfileById,
  postProfile
} from '../../services/api';

export function loadProfile(id) {
  return {
    type: PROFILE_LOAD,
    payload: getProfileById(id)
  };
}

export function addProfile(profile) {
  return {
    type: PROFILE_ADD,
    payload: postProfile(profile)
  };
}