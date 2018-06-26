
export const PROFILE_LOAD = 'PROFILE_LOAD';
export const PROFILES_LOAD = 'PROFILES_LOAD';
export const PROFILE_UPDATE = 'PROFILE_UPDATE';
export const PROFILE_ADD = 'PROFILE_ADD';

export const getProfile = state => state.profile;

export function profile(state = {}, { type, payload }) {
  switch(type) {
    case PROFILE_LOAD: {
      return payload;
    }
    case PROFILE_UPDATE: {
      return payload;
    }
    default:
      return state;
  }
}

export function profiles(state = [], { type, payload }) {
  switch(type) {
    case PROFILES_LOAD: {
      return payload;
    }
    case PROFILE_ADD:
      return [...state, payload];
    default:
      return state;
  }
}