jest.mock('../../services/api', () => ({
  signin: jest.fn(),
  signup: jest.fn(),
  verify: jest.fn(),
  getUserProfile: jest.fn()
}));

import { signup, signin, logout, loadUser } from './actions';
import { USER_AUTH, LOGOUT, USER_LOAD } from './reducers';
import { 
  signup as signupSvc, 
  signin as signinSvc,
  getUserProfile } from '../../services/api'; 

describe('auth action creators', () => {

  function testAuth(name, mockSvc, actionCreator) {
    it(`creates ${name} action`, () => {
      const promise = Promise.resolve();
      mockSvc.mockReturnValueOnce(promise);
      
      const credentials = {};
      const { type, payload } = actionCreator(credentials);
      expect(type).toBe(USER_AUTH);
      expect(payload).toBe(promise);
      expect(mockSvc.mock.calls.length).toBe(1);
      expect(mockSvc.mock.calls[0][0]).toBe(credentials);
    });
  }

  testAuth('signup', signupSvc, signup);
  testAuth('signin', signinSvc, signin);

  it('creates logout action', () => {
    const { type } = logout();
    expect(type).toBe(LOGOUT);
  });

  it('creates a load action for a single user', () => {
    const data = { name: 'user', email: 'email', profile: [{ _id: '1' }] };
    const promise = Promise.resolve(data);
    getUserProfile.mockReturnValueOnce(promise);

    const { type, payload } = loadUser();
    expect(type).toBe(USER_LOAD);
    expect(getUserProfile.mock.calls.length).toBe(1);
    expect(payload).toBe(promise);
  });

});