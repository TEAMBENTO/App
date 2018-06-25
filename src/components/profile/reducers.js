
export const PROFILE_LOAD = 'PROFILE_LOAD';

export function profile( state = {}, { type, payload }) {
    switch(type) {
        case PROFILE_LOAD: {
            return payload;
        }
        default:
        return state;
    }
}