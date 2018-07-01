jest.mock('../../services/api', () => ({
  getProfileById: jest.fn(),
  getAllProfiles: jest.fn(),
  postProfile: jest.fn(),
  putProfile: jest.fn()
}));

import { loadProfile, loadProfiles, addProfile, updateProfile } from './actions';
import { PROFILE_LOAD, PROFILES_LOAD, PROFILE_ADD, PROFILE_UPDATE } from './reducers';
import { getAllProfiles, getProfileById, postProfile, putProfile } from '../../services/api';


describe('profile action tests', ()=> {

  it('creates a load action for all profiles', () => {
    const promise = Promise.resolve(['profile']);
    getAllProfiles.mockReturnValueOnce(promise);

    const { type, payload } = loadProfiles();
    expect(type).toBe(PROFILES_LOAD);
    expect(getAllProfiles.mock.calls.length).toBe(1);
    expect(payload).toBe(promise);
  });

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