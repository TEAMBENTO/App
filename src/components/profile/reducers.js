
export const PROFILE_LOAD = 'PROFILE_LOAD';
export const PROFILES_LOAD = 'PROFILES_LOAD';
export const PROFILE_UPDATE = 'PROFILE_UPDATE';
export const PROFILE_ADD = 'PROFILE_ADD';
export const PROFILE_LOGIN_LOAD = 'PROFILE_LOGIN_LOAD';
export const PROFILE_LOGOUT = 'PROFILE_LOGOUT';

export const getProfile = state => state.profile;
export const getProfiles = state => state.profiles;

export function profile(state = {}, { type, payload }) {
  switch(type) {
    case PROFILE_LOAD: {
      return payload; 
    }
    case PROFILE_LOGIN_LOAD: {
      return payload[0];
    }
    case PROFILE_UPDATE: {
      return payload;
    }
    case PROFILE_LOGOUT: {
      return null;
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
      return [state, payload];
    case PROFILE_LOGOUT: {
      return null;
    }
    default:
      return state;
  }
}