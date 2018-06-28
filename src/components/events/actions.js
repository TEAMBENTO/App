import { EVENTS_LOAD, EVENT_ADD, EVENT_LOAD, EVENT_UPDATE, EVENT_REMOVE } from './reducers';
import { getAllEvents, getEventById, postEvent, putEvent, deleteEvent, getEventByGroup, putEventAttendants } from '../../services/api';

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

export function loadEvent(id) {
  return {
    type: EVENT_LOAD,
    payload: getEventById(id)
  };
}

export function updateEvent(event) {
  return {
    type: EVENT_UPDATE,
    payload: putEvent(event)
  };
}

export function removeEvent(id) {
  return {
    type: EVENT_UPDATE,
    payload: deleteEvent(id)
  };
}

export function loadEventsByGroup(id) {
  return {
    type: EVENTS_LOAD,
    payload: getEventByGroup(id)
  };
}

export function updateEventAttendants(event) {
  return {
    type: EVENT_UPDATE,
    payload: putEventAttendants(event)
  };
}