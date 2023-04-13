import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signup = (formData, router,role) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });
    if(role === 2)
      router('/Homepage')
    else router('/THomepage')
  } catch (error) {
    console.log(error);
  }
};