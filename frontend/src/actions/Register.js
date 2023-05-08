import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';
import Swal from 'sweetalert2'
export const signup = (formData, router,role) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    Swal.fire({
                    timer:1500,
                    timerProgressBar:true,
                    showConfirmButton:false,
                    icon:'success',
                    title:'You\'ll be redirected soon',
                }) 
    dispatch({ type: AUTH, data });
    
   // if(role === 2)
      router('/Homepage')
    //else router('/THomepage')
  } catch (error) {
      Swal.fire({
      title:'A user already exists with this email. Login?',
      showConfirmButton:true,
      confirmButtonText:'Login',
      confirmButtonColor:'#0C21C1',
      showCancelButton:true,
      icon:'error'
    }).then((result)=>{
      if(result.isConfirmed)
      {
        router('/Login')
      }
    })
    console.log(error);
  }
};