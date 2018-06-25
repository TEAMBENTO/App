jest.mock('../../services/api', () => ({
  getProfileById: jest.fn()
}));

import { loadProfile } from './actions';
import { PROFILE_LOAD } from './reducers';
import { getProfileById } from '../../services/api';

describe('loads a profile', ()=> {

  it('loads a profile', () => {

    const promise = Promise.resolve();
    getProfileById.mockReturnValueOnce(promise);

    const { type, payload } = loadProfile(promise);
    expect(type).toBe(PROFILE_LOAD);
    expect(getProfileById.mock.calls.length).toBe(1);
    expect(payload).toBe(promise);

  });


});