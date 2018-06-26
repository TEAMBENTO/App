jest.mock('../../services/api', () => ({
  getAllGroups: jest.fn(),
  postGroup: jest.fn(),
  getGroupById: jest.fn()
}));

import { loadGroups, addGroup, loadGroup } from './actions';
import { GROUPS_LOAD, GROUP_ADD, GROUP_LOAD } from './reducers';
import { getAllGroups, postGroup, getGroupById } from '../../services/api';

describe('loads groups', () => {

  it('loads groups', () => {
    const promise = Promise.resolve();
    getAllGroups.mockReturnValueOnce(promise);

    const { type, payload } = loadGroups();
    expect(type).toBe(GROUPS_LOAD);
    expect(getAllGroups.mock.calls.length).toBe(1);
    expect(payload).toBe(promise);
  });

  it('adds a group', () => {
    const promise = Promise.resolve();
    postGroup.mockReturnValueOnce(promise);

    const { type, payload } = addGroup(promise);
    expect(type).toBe(GROUP_ADD);
    expect(postGroup.mock.calls.length).toBe(1);
    expect(payload).toBe(promise);
  });
});

describe('loads a group', () => {
  it('loads groups', () => {
    const promise = Promise.resolve();
    getGroupById.mockReturnValueOnce(promise);

    const { type, payload } = loadGroup(promise);
    expect(type).toBe(GROUP_LOAD);
    expect(getGroupById.mock.calls.length).toBe(1);
    expect(payload).toBe(promise);
  });
})