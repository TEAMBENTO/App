import {
  GROUPS_LOAD
} from './reducers';

import {
  getAllGroups
} from '../../services/api';

export function loadGroups() {
  return {
    type: GROUPS_LOAD,
    payload: getAllGroups()
  };
}