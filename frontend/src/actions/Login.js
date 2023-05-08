import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';
import Swal from 'sweetalert2'
export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    Swal.fire({
            timer:1500,
            timerProgressBar:true,
            showConfirmButton:false,
            icon:'success',
            title:'You\'ll be redirected soon',
        }) 
    dispatch({ type: AUTH, data });
    const user = JSON.parse(localStorage.getItem('profile'))
    console.log(user?.result)
    
    router('/Homepage')

  } catch (error) {
    Swal.fire({
      title:'Opps! Incorrect credentials. Try again',
      icon:'error'
    })
    console.log(error);
  }
};