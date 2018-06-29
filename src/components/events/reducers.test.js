import {
  events,
  singleEvent,
  EVENTS_LOAD,
  EVENT_ADD,
  EVENT_UPDATE,
  EVENT_REMOVE,
  EVENT_LOAD
} from './reducers';

describe('events reducer', () => {

  const sneks = { _id: 123,
    type: 'soccer',
    location: 'Portland',
    description: 'were gonna play futball2',
    teamName: 'sneaky sneks2',
    private: 'false'
  };

  const footballSneks = {
    _id: 234,
    type: 'basketball',
    location: 'Portland',
    description: 'were gonna play basketball',
    teamName: 'sneaky sneks2',
    private: 'false'
  };

  it('returns empty array for inital state', () => {
    const state = events(undefined, {});
    expect(state).toEqual([]);
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

  it('updates an event', () => {
    const state = events(
      [{ _id: 123,
        type: 'soccer',
        location: 'Portland',
        description: 'were gonna play futball2',
        teamName: 'sneaky sneks2',
        private: 'false' }],
      {
        type: EVENT_UPDATE,
        payload: { _id: 123,
          type: 'basketball',
          location: 'Portland',
          description: 'were gonna play basketball',
          teamName: 'sneaky sneks2',
          private: 'false' } 
      });
    expect(state).toEqual([{ 
      _id: 123,
      type: 'basketball',
      location: 'Portland',
      description: 'were gonna play basketball',
      teamName: 'sneaky sneks2',
      private: 'false' } 
    ]);
  });

  it('removes an event', () => {
    const state = events([sneks, footballSneks], { type: EVENT_REMOVE, payload: sneks });
    expect(state).toEqual([footballSneks]);
  });

});

describe('event reducer', () => {

  it('returns empty object for inital state', () => {
    const state = singleEvent(undefined, {});
    expect(state).toEqual({});
  });

  it('loads a singular event', () => {
    const data = { type: 'something' };

    const state = singleEvent({}, {
      type: EVENT_LOAD,
      payload: data
    });

    expect(state).toEqual(data);
  });

});