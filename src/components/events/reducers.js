export const EVENTS_LOAD = 'EVENTS_LOAD';
export const EVENT_ADD = 'EVENT_ADD';
export const EVENT_UPDATE = 'EVENT_UPDATE';
export const EVENT_REMOVE = 'EVENT_REMOVE';
export const EVENT_LOAD = 'EVENT_LOAD';

export const getEvents = state => state.events;

export function events(state = [], { type, payload }) {
  switch(type) {
    case EVENTS_LOAD: {
      return payload;
    }
    case EVENT_ADD: {
      return [...state, payload];
    }
    case EVENT_UPDATE: {
      return state.map(event => event._id === payload._id ? payload : event);
    }
    case EVENT_REMOVE: {
      return state.filter(event => event !== payload);
    }
    default:
      return state;
  }
}

export function event(state = {}, { type, payload }) {
  switch(type) {
    case EVENT_LOAD: {
      return payload;
    }
    default:
      return state;
  }
}