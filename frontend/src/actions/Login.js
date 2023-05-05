import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    
    dispatch({ type: AUTH, data });
    const user = JSON.parse(localStorage.getItem('profile'))
    console.log(user?.result)
   
    router('/Homepage')

  } catch (error) {
    console.log(error);
  }
};