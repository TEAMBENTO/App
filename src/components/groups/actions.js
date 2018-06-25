import {
  GROUPS_LOAD,
  GROUP_ADD
} from './reducers';

import {
  getAllGroups,
  postGroup
} from '../../services/api';

export function loadGroups() {
  return {
    type: GROUPS_LOAD,
    payload: getAllGroups()
  };
}

export function addGroup(group) {
  return {
    type: GROUP_ADD,
    payload: postGroup(group)
  };
}