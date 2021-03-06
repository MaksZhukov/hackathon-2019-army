import { post, get } from '../api';
import authService from '../../../services/authService';

import {
  SET_IS_CHECKING,
  SIGN_IN,
  LOG_OUT,
  FETCH_USER,
} from '../constants/user.constants';

export const fetchUser = () => async dispatch => {
  try {
    const user = await get(`/user/${localStorage.getItem('userId')}`);

    await dispatch({
      type: FETCH_USER,
      payload: { ...user },
    });
  } catch (e) {
    console.log(e);
    error = e;
  }
};

export const signIn = ({ username, password }) => async dispatch => {
  await dispatch({
    type: SET_IS_CHECKING,
    payload: true,
  });

  let error = '';

  try {
    const { user, token } = await post(`/user/sign-in`, { username, password });
  
    authService.setToken(token);
    localStorage.setItem('userId', user._id);

    await dispatch({
      type: SIGN_IN,
      payload: { ...user },
    });
  } catch (e) {
    console.log(e);
    error = e;
  }

  await dispatch({
    type: SET_IS_CHECKING,
    payload: false,
  });
  return error;
};

export const signUp = ({ username, password }) => async dispatch => {
  await dispatch({
    type: SET_IS_CHECKING,
    payload: true,
  });

  let error = '';

  try {
    const { user, token } = await post(`/user/sign-up`, { username, password });
  
    authService.setToken(token);
    localStorage.setItem('userId', user._id);

    await dispatch({
      type: SIGN_IN,
      payload: { ...user },
    });
  } catch (e) {
    error = e;
  }
  
  await dispatch({
    type: SET_IS_CHECKING,
    payload: false,
  });
  return error;
};

export const logOut = () => dispatch => {
  authService.removeToken();
  dispatch({ type: LOG_OUT });
};
