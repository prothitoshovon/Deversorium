import * as api from '../api/index.js';
import * as actionType from '../constants/actionTypes.js';
export const getUserByEmail = (email) => async (dispatch) =>{
  try {

    const { data } = await api.getUserByEmail(email);

    dispatch({ type: actionType.FETCH_USER, payload: { email: data } });
  } catch (error) {
    console.log(error);
  }
};

export const updateuser = (uid, newUser) => async(dispatch) =>{
  try {
    console.log(uid)
    console.log(newUser)
    const { data } = await api.updateuser(uid,newUser);

    dispatch({ type: actionType.UPDATE, payload: {user:data} });
  } catch (error) {
    console.log(error);
  }
}