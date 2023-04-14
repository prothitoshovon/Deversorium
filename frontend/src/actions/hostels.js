import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

import * as api from '../api/index.js';

// export const fetchHostels = () => axios.get(url);
// export const createHostels = (newPost) => axios.post(url, newPost);
// export const updateHostel = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
// export const deleteHostel = (id) => axios.delete(`${url}/${id}`);
const createHostel = (newHostel) => async (dispatch) =>{
    try {
    const { data } = await api.createHostel(newHostel)

    dispatch({ type: CREATE, payload: data })
  } catch (error) {
    console.log(error.message);
  }
}