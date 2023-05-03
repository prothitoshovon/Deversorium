import {  CREATE, FETCH_HOSTEL, FETCH_EMPTY_ROOMS , START_LOADING, END_LOADING, FETCH_ROOM_BY_ROOM_ID, BOOK, LEAVE, FETCH_ROOM_BY_HOSTEL_ID,} from '../constants/actionTypes';

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
export const getRoomsByHostelId = (id) => async(dispatch) =>{
  try {
    const {data} = await api.getRoomsByHostelId(id)
    dispatch({type:FETCH_ROOM_BY_HOSTEL_ID, payload:{rooms:data}})
  } catch (error) {
    console.log(error)
  }
}
export const bookRoom = (id, uid,hid) => async (dispatch) =>{
  try {
    const {data} = await api.bookRoom(id,uid,hid)
    
    dispatch({type:BOOK, payload:{room:data}})
  } catch (error) {
    console.log(error)
  }
}

export const leaveRoom = (id,uid,hid) => async (dispatch) =>{
  try {
    const {data} = await api.leaveRoom(id,uid,hid)
    
    dispatch({type:LEAVE, payload:{room:data}})
  } catch (error) {
    console.log(error)
  }
}