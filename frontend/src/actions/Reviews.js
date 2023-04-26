import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, START_LOADING, FETCH_HOSTEL, END_LOADING } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const createReview = (newReview) => async (dispatch) =>{
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.createReview(newReview)
      dispatch({ type: CREATE, payload: data })
      dispatch({type: END_LOADING})
  } catch (error) {
    console.log(error.message);
  }
}
