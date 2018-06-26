import {
  GROUPS_LOAD,
  GROUP_ADD,
  GROUP_LOAD,
  GROUP_UPDATE,
  GROUP_REMOVE
} from './reducers';

import {
  getAllGroups,
  postGroup,
  getGroupById,
  putGroup,
  deleteGroup
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

export function updateGroup(group) {
  return {
    type: GROUP_UPDATE,
    payload: putGroup(group)
  };
}

export function removeGroup(id) {
  return {
    type: GROUP_REMOVE,
    payload: deleteGroup(id)
  };
}