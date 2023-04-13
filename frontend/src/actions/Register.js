import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });
    router('/Homepage')
  } catch (error) {
    console.log(error);
  }
};