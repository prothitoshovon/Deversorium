import {  CREATE, FETCH_HOSTEL, FETCH_EMPTY_ROOMS , START_LOADING, END_LOADING} from '../constants/actionTypes';

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
