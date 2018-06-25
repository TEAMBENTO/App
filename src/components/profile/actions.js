import {
  PROFILE_LOAD
} from './reducers';

import {
  getProfileById
} from '../../services/api';

export function loadProfile(id) {
  return {
    type: PROFILE_LOAD,
    payload: getProfileById(id)
  };
}