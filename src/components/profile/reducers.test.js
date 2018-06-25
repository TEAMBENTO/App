import {
    profile,
    PROFILE_LOAD 
} from './reducers.js'

describe('Profile reducers', () => {


    it('empty object for initial state', () =>{

        const state = profile(undefined, {});
        expect(state).toEqual({});
    });

    it('Loads a Profile', () => {
        const data = { userId: 1, activities: 'basketball' }

        const state = profile( {}, { type: PROFILE_LOAD, payload: data });
        expect(state).toEqual(data);
    });
});