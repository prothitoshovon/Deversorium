import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    
    dispatch({ type: AUTH, data });
    const user = JSON.parse(localStorage.getItem('profile'))
    // console.log('ayo')
    // console.log(user.result.role)
    //if(user.result.role == 1)router('/THomepage')
    //else 
    router('/Homepage')

  } catch (error) {
    console.log(error);
  }
};