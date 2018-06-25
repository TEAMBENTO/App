import {
  events,
  EVENTS_LOAD,
  EVENT_ADD,
  EVENT_UPDATE
} from './reducers';

describe('events reducer', () => {

  it('returns empty array for inital state', () => {
    const state = events(undefined, {});
    expect(state).toEqual([]);
  });

  it('loads all events', () => {
    const data = [{
      type: 'soccer',
      location: 'Portland',
      description: 'were gonna play futball',
      teamName: 'sneaky sneks',
      private: 'false'
    }];

    const state = events([], {
      type: EVENTS_LOAD,
      payload: data
    });

    expect(state).toEqual(data);
  });

  it('adds an event', () => {
    const data = {
      type: 'soccer',
      location: 'Portland',
      description: 'were gonna play futball',
      teamName: 'sneaky sneks',
      private: 'false'
    };

    const data2 = {
      type: 'soccer',
      location: 'Portland',
      description: 'were gonna play futball2',
      teamName: 'sneaky sneks2',
      private: 'false'
    };

    const state = events([data], {
      type: EVENT_ADD,
      payload: data2
    });

    expect(state).toEqual([data, data2]);
  });
});