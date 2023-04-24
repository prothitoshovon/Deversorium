import {  CREATE,DELETE, FETCH_HOSTEL, FETCH_EMPTY_ROOMS , START_LOADING, END_LOADING,FETCH_ROOM_REQUEST_BY_HOSTEL_ID} from '../constants/actionTypes';

import * as api from '../api/index.js';

export const createRoomRequest = (newRoomRequest) => async (dispatch) =>{
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.createRoomRequest(newRoomRequest)
      console.log(data)
      dispatch({ type: CREATE, payload: data })
      dispatch({type: END_LOADING})
  } catch (error) {
    console.log(error.message);
  }
}
export const getRoomRequestsByHostelId = (id) => async (dispatch) =>{
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.getRoomRequestsByHostelId(id);
    
    dispatch({ type: FETCH_ROOM_REQUEST_BY_HOSTEL_ID, payload: { roomRequests: data } });
    dispatch({type: END_LOADING})
  } catch (error) {
    console.log(error);
  }
}
export const deleteRoomRequest = (id) => async (dispatch) =>{

  try {
    await await api.deleteRoomRequest(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
}