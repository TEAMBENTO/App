import {
  GROUPS_LOAD,
  GROUP_ADD,
  GROUP_LOAD
} from './reducers';

import {
  getAllGroups,
  postGroup,
  getGroupById
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

export function loadGroup(id) {
  return {
    type: GROUP_LOAD,
    payload: getGroupById(id)
  };
}