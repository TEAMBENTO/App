import { USER_AUTH, LOGOUT, CHECKED_AUTH, USER_LOAD } from './reducers';
import { PROFILE_LOGOUT, USER_PROFILE_LOGOUT } from '../profile/reducers';
import { verifyUser, getUserProfile } from '../../services/api';
import { getStoredUser, clearStoredUser } from '../../services/request';

import { 
  signup as signupApi, 
  signin as signinApi
} from '../../services/api';

const makeAuth = api => credentials => ({
  type: USER_AUTH,
  payload: api(credentials)
});

export const signup = makeAuth(signupApi);
export const signin = makeAuth(signinApi);

export const logout = () => ({ type: LOGOUT });
export const profLogout = () => ({ type: PROFILE_LOGOUT });
export const userProfLogout = () => ({ type: USER_PROFILE_LOGOUT });

export function loadUser(id) {
  return {
    type: USER_LOAD,
    payload: getUserProfile(id)
  };
}

const authChecked = () => ({ type: CHECKED_AUTH });

export const tryLoadUser = () => dispatch => {
  const user = getStoredUser();
  if(!user || !user.token) {
    return dispatch(authChecked());
  }

  verifyUser(user.token)
    .then(() => dispatch({
      type: USER_AUTH,
      payload: user
    }))
    .catch(() => {
      clearStoredUser();
    })
    .then(() => {
      dispatch(authChecked());
    });
};