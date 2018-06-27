import { EVENTS_LOAD, EVENT_ADD, EVENT_LOAD, EVENT_UPDATE, EVENT_REMOVE } from './reducers';
import { getAllEvents, getEventById, postEvent, getEventByGroup } from '../../services/api';

export function loadEvents() {
  return {
    type: EVENTS_LOAD,
    payload: getAllEvents()
  };
}

export function addEvent(event) {
  return {
    type: EVENT_ADD,
    payload: postEvent(event)
  };
}

export function loadEvent() {
  return {
    type: EVENT_LOAD,
    payload: getEventById()
  };
}

export function loadEventsByGroup(id) {
  return {
    type: EVENTS_LOAD,
    payload: getEventByGroup(id)
  };
}