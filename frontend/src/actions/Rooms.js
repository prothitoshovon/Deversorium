import {  CREATE, FETCH_HOSTEL, FETCH_EMPTY_ROOMS , START_LOADING, END_LOADING, FETCH_ROOM_BY_ROOM_ID, BOOK} from '../constants/actionTypes';

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
export const getRoomsByRoomId = (id)=> async (dispatch) =>{
  try {
    const {data} = await api.getRoomsByRoomId(id)
    dispatch({type:FETCH_ROOM_BY_ROOM_ID, payload:{room:data}})
  } catch (error) {
    console.log(error)
  }
}
export const bookRoom = (id, uid) => async (dispatch) =>{
  try {
    const {data} = await api.bookRoom(id,uid)
    
    dispatch({type:BOOK, payload:{room:data}})
  } catch (error) {
    console.log(error)
  }
}

