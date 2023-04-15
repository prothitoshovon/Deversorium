import {  CREATE,  START_LOADING, FETCH_HOSTEL } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const createRoom = (newRoom) => async (dispatch) =>{
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.createRoom(newRoom)

      dispatch({ type: CREATE, payload: data })
  } catch (error) {
    console.log(error.message);
  }
}

