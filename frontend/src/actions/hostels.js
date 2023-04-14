import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, START_LOADING, FETCH_HOSTEL } from '../constants/actionTypes';

import * as api from '../api/index.js';

// export const fetchHostels = () => axios.get(url);
// export const createHostels = (newPost) => axios.post(url, newPost);
// export const updateHostel = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
// export const deleteHostel = (id) => axios.delete(`${url}/${id}`);
//TODO getHostel by owner ID implementation 
export const createHostel = (newHostel) => async (dispatch) =>{
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.createHostel(newHostel)

      dispatch({ type: CREATE, payload: data })
  } catch (error) {
    console.log(error.message);
  }
}

export const getHostelByOwnerId = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    
    const { data } = await api.getHostelByOwnerId(id);
    dispatch({ type: FETCH_HOSTEL, payload: { hostel: data } });
  } catch (error) {
    console.log(error);
  }
};