export const EVENTS_LOAD = 'EVENTS_LOAD';
export const EVENT_ADD = 'EVENT_ADD';
export const EVENT_UPDATE = 'EVENT_UPDATE';

export const getEvents = state => state.events;

export function events(state = [], { type, payload }) {
  switch(type) {
    case EVENTS_LOAD: {
      return payload;
    }
    case EVENT_ADD: {
      return [...state, payload];
    }
    default:
      return state;
  }
}