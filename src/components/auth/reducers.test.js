import {  user, getUser, USER_AUTH, LOGOUT, USER_LOAD } from './reducers';

describe('user reducer', () => {

  it('initializers to null', () => {
    const state = user(undefined, {});
    expect(state).toBe(null);
  });

  it('loads user', () => {
    const data = { name: 'user' };
    const state = user(null, { type: USER_AUTH, payload: data });
    expect(state).toEqual(data);
  });

  it('loads user with profile', () => {
    const data = { name: 'user', email: 'email', profile: [{ _id: '1' }] };
    const state = user(null, { type: USER_LOAD, payload: data });
    expect(state).toEqual(data);
  });

  it('clears user on logout', () => {
    const state = user({}, { type: LOGOUT });
    expect(state).toBe(null);
  });

  it('gets user from state', () => {
    const user = {};
    expect(getUser({ user })).toBe(user);
  });


});

