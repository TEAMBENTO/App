import { EVENTS_LOAD, EVENTS_ADD, EVENT_UPDATE, EVENT_REMOVE } from './reducers';
import { getAllEvents, getEventById, postEvent } from '../../services/api';

export function loadEvents() {
  return {
    type: EVENTS_LOAD,
    payload: getAllEvents()
  };
}