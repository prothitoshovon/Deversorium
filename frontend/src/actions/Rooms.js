import {  CREATE, FETCH_HOSTEL, FETCH_EMPTY_ROOMS , START_LOADING, END_LOADING} from '../constants/actionTypes';

import * as api from '../api/index.js';

export const createRoom = (newRoom) => async (dispatch) =>{
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.createRoom(newRoom)

      dispatch({ type: CREATE, payload: data })
      dispatch({type: END_LOADING})
  } catch (error) {
    console.log(error.message);
  }
}

export const getEmptyRooms = () => async (dispatch) =>{
  try {
    dispatch({type:START_LOADING})
    const {data} = await api.getEmptyRooms()
    // console.log('in Actions')
    // console.log(data)
    dispatch({type:FETCH_EMPTY_ROOMS,payload:{rooms:data }})
    dispatch({type: END_LOADING})
  } catch (error) {
    console.log(error)
  }
}

