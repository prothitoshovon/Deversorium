import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, START_LOADING, FETCH_HOSTEL, END_LOADING, ERROR } from '../constants/actionTypes';

import * as api from '../api/index.js';
 
export const getHostels = ()  => async(dispatch) =>{
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.getHostels();
    
    dispatch({ type: FETCH_ALL, payload: { hostels: data } });
    dispatch({type: END_LOADING})
  } catch (error) {
    dispatch({type:ERROR})
    console.log(error);
  }
}
export const createHostel = (newHostel) => async (dispatch) =>{
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.createHostel(newHostel)

      dispatch({ type: CREATE, payload: data })
      dispatch({type: END_LOADING})
  } catch (error) {
    dispatch({type:ERROR})
    console.log(error.message);
  }
}

export const getHostelByOwnerId = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.getHostelByOwnerId(id);
    
    dispatch({ type: FETCH_HOSTEL, payload: { hostel: data } });
    dispatch({type: END_LOADING})
  } catch (error) {
    dispatch({type:ERROR})
    console.log(error);
  }
};

export const getHostelByHostelId = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.getHostelByHostelId(id);
    
    dispatch({ type: FETCH_HOSTEL, payload: { hostel: data } });
    dispatch({type: END_LOADING})
  } catch (error) {
    dispatch({type:ERROR})
    console.log(error);
  }
}