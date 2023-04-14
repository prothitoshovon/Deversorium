import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, START_LOADING } from '../constants/actionTypes';

import * as api from '../api/index.js';

// export const fetchHostels = () => axios.get(url);
// export const createHostels = (newPost) => axios.post(url, newPost);
// export const updateHostel = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
// export const deleteHostel = (id) => axios.delete(`${url}/${id}`);
export const createHostel = (newHostel) => async (dispatch) =>{
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.createHostel(newHostel)

      dispatch({ type: CREATE, payload: data })
  } catch (error) {
    console.log(error.message);
  }
}

