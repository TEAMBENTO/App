export const EVENTS_LOAD = 'EVENTS_LOAD';
export const EVENT_ADD = 'EVENT_ADD';
export const EVENT_UPDATE = 'EVENT_UPDATE';

export const getEvents = state => state.events;

export function events(state = [], { type, payload }) {
  switch(type) {
    default:
      return state;
  }
}