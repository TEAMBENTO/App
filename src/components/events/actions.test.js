jest.mock('../../services/api', () => ({
  getAllEvents: jest.fn(),
  postEvent: jest.fn(),
  getEventById: jest.fn()
}));


import { EVENTS_LOAD, EVENT_ADD, EVENT_UPDATE, EVENT_REMOVE } from './reducers';
import { loadEvents, addEvent } from './actions';
import { getAllEvents, postEvent, getEventById } from '../../services/api';

describe('events actions', () => {

  it('loads events', () => {
    const promise = Promise.resolve();
    getAllEvents.mockReturnValueOnce(promise);

    const { type, payload } = loadEvents();
    expect(type).toBe(EVENTS_LOAD);
    expect(getAllEvents.mock.calls.length).toBe(1);
    expect(payload).toBe(promise);
  });
  
  it('adds event', () => {
    const promise = Promise.resolve();
    postEvent.mockReturnValueOnce(promise);

    const { type, payload } = addEvent();
    expect(type).toBe(EVENT_ADD);
    expect(getAllEvents.mock.calls.length).toBe(1);
    expect(payload).toBe(promise);
  });
  
});

