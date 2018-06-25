jest.mock('../../services/api', () => ({
  getAllGroups: jest.fn()
}));

import { loadGroups } from './actions';
import { GROUPS_LOAD } from './reducers';
import { getAllGroups } from '../../services/api';

describe('loads groups', () => {

  it('loads groups', () => {
    const promise = Promise.resolve();
    getAllGroups.mockReturnValueOnce(promise);

    const { type, payload } = loadGroups();
    expect(type).toBe(GROUPS_LOAD);
    expect(getAllGroups.mock.calls.length).toBe(1);
    expect(payload).toBe(promise);
  });

});