import {
  profile,
  profiles,
  PROFILE_LOAD,
  PROFILE_ADD
} from './reducers.js';

// describe('Profiles reducer', () => {

//     it('empty array for initial state', () => {
//         const state = profiles(undefined, {});
//         expect(state).toEqual([]);
//     });

//     it('loads all profiles', () => {
//         const data = {userId: 1, activities: 'yoga' }

//         const state =
//     });
    
// });

describe('Profile reducers', () => {

  const data1 = { userId: 1, activities: 'basketball' };
  const data2 = { userId: 2, activities: 'basketball' };

  it('empty object for initial state', () =>{

    const state = profile(undefined, {});
    expect(state).toEqual({});
  });

  it('Loads a Profile', () => {
    const state = profile({}, { type: PROFILE_LOAD, payload: data1 });
    expect(state).toEqual(data1);
  });

  it('adds a profile', () => {
    const state = profiles([data1], { type: PROFILE_ADD, payload: data2 });
    expect(state).toEqual([data1, data2]);
  });

  it('it updates a profile', () => {

  });

});