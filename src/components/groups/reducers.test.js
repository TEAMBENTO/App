import {
  groups,
  GROUPS_LOAD
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

});