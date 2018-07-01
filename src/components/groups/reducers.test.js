import {
  groups,
  GROUPS_LOAD,
  GROUP_ADD,
  GROUP_LOAD,
  group,
  getGroup,
  getGroups,
  GROUP_UPDATE,
  GROUP_REMOVE
} from './reducers';


describe('Groups Reducer', () => {

  it('empty array for initial state', () => {
    const state = groups(undefined, {});
    expect(state).toEqual([]);
  });

  it('loads all groups', () => {
    const data = [{ type: 'running', teamName: 'RUNNERS!', description: 'We like to run', private: false }];

    const state = groups([], {
      type: GROUPS_LOAD,
      payload: data
    });

    expect(state).toEqual(data);
  });

  it('adds a new group', () => {
    const data = { type: 'running', teamName: 'RUNNERS!', description: 'We like to run', private: false };
    const newData = { type: 'running', teamName: 'RUNNERS!', description: 'We like to run', private: false };

    const state = groups([data], {
      type: GROUP_ADD,
      payload: newData
    });

    expect(state).toEqual([data, newData]);
  });
});

describe('Group Reducer', () => {

  it('empty object for initial state', () => {
    const state = group(undefined, {});
    expect(state).toEqual({});
  });

  it('loads a group', () => {
    const data = { type: 'running', teamName: 'RUNNERS!', description: 'We like to run', private: false };

    const state = group({}, {
      type: GROUP_LOAD,
      payload: data
    });

    expect(state).toEqual(data);
  });

  it('updates a group', () => {
    const data = { _id: 1, type: 'running', teamName: 'RUNNERS!', description: 'Exercise', private: false };
    const updated = { _id: 1, type: 'yoga', teamName: 'YOGA!', description: 'Exercise', private: false };

    const state = group(data, {
      type: GROUP_UPDATE,
      payload: updated
    });

    expect(state).toEqual(updated);
  });

  it('deletes a group', () => {
    const data = { _id: 1, type: 'running', teamName: 'RUNNERS!', description: 'Exercise', private: false };

    const state = group(data, {
      type: GROUP_REMOVE
    });

    expect(state).toEqual(null);
  });

});

describe('Group Selectors', () => {
  
  it('selects groups', () => {
    const data = { _id: 1, type: 'running', teamName: 'RUNNERS!', description: 'We like to run', private: false };
    const moreData = { _id: 2, type: 'basketball', teamName: 'Ballers!', description: 'We like to basketball', private: false };

    const groups = [data, moreData];
    const got = getGroups({ groups });
    expect(got).toBe(groups);
  });

  it('selects a group', () => {
    const group = { _id: 1, type: 'running', teamName: 'RUNNERS!', description: 'We like to run', private: false };
    const got = getGroup({ group });
    expect(got).toBe(group);
  });
});