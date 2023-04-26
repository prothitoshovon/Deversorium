import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, START_LOADING, FETCH_HOSTEL, END_LOADING, FETCH } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const createComplaint = (newComplaint) => async (dispatch) =>{
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.createComplaint(newComplaint)
      dispatch({ type: CREATE, payload: data })
      dispatch({type: END_LOADING})
  } catch (error) {
    console.log(error.message);
  }
}

// export const getReviewsByUserAndHostel = (uid,hid) => async (dispatch) =>{
//     try {
//     dispatch({ type: START_LOADING });
//     const { data } = await api.getReviewsByUserAndHostel(uid, hid);
    
//     dispatch({ type: FETCH, payload: { review: data } });
//     dispatch({type: END_LOADING})
//   } catch (error) {
//     console.log(error);
//   }
// }