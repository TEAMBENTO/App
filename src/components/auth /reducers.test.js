import {  user, getUser, USER_AUTH, LOGOUT } from './reducers';

describe('user reducer', () => {

  it('initializers to null', () => {
    const state = user(undefined, {});
    expect(state).toBe(null);
  });


});

