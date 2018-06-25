export const GROUPS_LOAD = 'GROUPS_LOAD';
export const GROUP_ADD = 'GROUP_ADD';


export function groups(state = [], { type, payload }) {
  switch(type) {
    case GROUPS_LOAD: {
      return payload;
    }
    case GROUP_ADD: {
      return [...state, payload];
    }
    default:
      return state;
  }
}
