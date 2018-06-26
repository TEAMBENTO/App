export const GROUPS_LOAD = 'GROUPS_LOAD';
export const GROUP_ADD = 'GROUP_ADD';
export const GROUP_UPDATE = 'GROUP_UPDATE';
export const GROUP_LOAD = 'GROUP_LOAD';
export const getGroups = state => state.groups;
export const getGroup = state => state.group;

export function groups(state = [], { type, payload }) {
  switch(type) {
    case GROUPS_LOAD: {
      return payload;
    }
    case GROUP_ADD: {
      return [...state, payload];
    }
    // case GROUP_UPDATE: {
    //   const copy = state;
    //   const updatedGroups = copy.map(group => {
    //     if(group._id === payload._id) group = payload;
    //   });
    //   return updatedGroups;
    // }
    default:
      return state;
  }
}

export function group(state = {}, { type, payload }) {
  switch(type) {
    case GROUP_LOAD: {
      return payload;
    }
    case GROUP_UPDATE: {
      return payload
    }
    default:
      return state;
  }
}
