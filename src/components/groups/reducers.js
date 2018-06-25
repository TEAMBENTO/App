export const GROUPS_LOAD = 'GROUPS_LOAD';


export function groups(state = [], { type, payload }) {
  switch(type) {
    case GROUPS_LOAD: {
      return payload;
    }
    default:
      return state;
  }
}
