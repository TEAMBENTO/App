import { EVENTS_LOAD, EVENT_ADD, EVENT_UPDATE, EVENT_REMOVE } from './reducers';
import { getAllEvents, getEventById, postEvent } from '../../services/api';

export function loadEvents() {
  return {
    type: EVENTS_LOAD,
    payload: getAllEvents()
  };
}

export function addEvent() {
  return {
    type: EVENT_ADD,
    payload: postEvent()
  };
}