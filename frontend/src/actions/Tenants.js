import { START_LOADING, END_LOADING, CREATE, UPDATE, DELETE} from '../constants/actionTypes';
import * as api from '../api/index.js';

export const updateTenant = (id, tenant) => async (dispatch) => {
  try {
    const { data } = await api.updateTenant(id, tenant);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
}
