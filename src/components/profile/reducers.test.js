import {
  profile,
  profiles,
  getProfiles,
  PROFILE_LOAD,
  PROFILES_LOAD,
  PROFILE_ADD,
  PROFILE_UPDATE
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
const data1 = { userId: 1, activities: 'basketball' };
const data2 = { userId: 2, activities: 'basketball' };

describe('Profile reducers', () => {


  it('empty object for initial state', () =>{

    const state = profile(undefined, {});
    expect(state).toEqual({});
  });

  it('loads all profiles', () => {
    const state = profiles([], { type: PROFILES_LOAD, payload: [data1, data2] });
    expect(state).toEqual([data1, data2]);
  });

  it('Loads a Profile', () => {
    const state = profile({}, { type: PROFILE_LOAD, payload: data1 });
    expect(state).toEqual(data1);
  });

  it('adds a profile', () => {
    const state = profiles(data1, { type: PROFILE_ADD, payload: data2 });
    expect(state).toEqual([data1, data2]);
  });

  it('it updates a profile', () => {
    const data = { _id: 1, activities: 'running', bio: 'I LOVE TO RUN!' };
    const updated = { _id: 1, activities: 'running', bio: 'I LOVE TO RUN! TO FOOD!' };

    const state = profile(data, {
      type: PROFILE_UPDATE,
      payload: updated
    });

    expect(state).toEqual(updated);
  });

});

describe('profile selectors', () => {
  it('gets profiles', () => {
    const profiles = [data1, data2];
    const got = getProfiles({ profiles });
    expect(got).toEqual(profiles);
  });
});