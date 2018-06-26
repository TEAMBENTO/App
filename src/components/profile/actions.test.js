jest.mock('../../services/api', () => ({
  getProfileById: jest.fn(),
  postProfile: jest.fn(),
  putProfile: jest.fn()
}));

import { loadProfile, addProfile, updateProfile } from './actions';
import { PROFILE_LOAD, PROFILE_ADD, PROFILE_UPDATE } from './reducers';
import { getProfileById, postProfile, putProfile } from '../../services/api';
import { GROUP_UPDATE } from '../groups/reducers';


describe('profile action tests', ()=> {

  it('loads a profile', () => {

    const promise = Promise.resolve();
    getProfileById.mockReturnValueOnce(promise);

    const { type, payload } = loadProfile(promise);
    expect(type).toBe(PROFILE_LOAD);
    expect(getProfileById.mock.calls.length).toBe(1);
    expect(payload).toBe(promise);

  });

  it('adds a profile', () => {
    const profile = { userId: 1, activities: 'yoga' };

    const promise = Promise.resolve(profile);
    postProfile.mockReturnValueOnce(promise);

    const { type, payload } = addProfile(promise);
    expect(type).toBe(PROFILE_ADD);
    expect(getProfileById.mock.calls.length).toBe(1);
    expect(payload).toBe(promise);
  });

});

describe('updates a profile', () => {

  it('updates a profile!', () => {
    const promise = Promise.resolve();
    putProfile.mockReturnValueOnce(promise);

    const { type, payload } = updateProfile(promise);
    expect(type).toBe(PROFILE_UPDATE);
    expect(putProfile.mock.calls.length).toBe(1);
    expect(payload).toBe(promise);


  });

});