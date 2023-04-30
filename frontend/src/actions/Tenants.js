import { START_LOADING, END_LOADING, CREATE, UPDATE, DELETE, FETCH_TENANT_BY_USER_ID} from '../constants/actionTypes';
import * as api from '../api/index.js';

export const updateTenant = (id, tenant) => async (dispatch) => {
  try {
    const { data } = await api.updateTenant(id, tenant);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const getTenantsByUserId = (id) => async(dispatch) => {
    try {
    dispatch({type: START_LOADING})
    const { data } = await api.getTenantsByUserId(id);

    dispatch({ type: FETCH_TENANT_BY_USER_ID, payload: {tenant:data} });
    dispatch({type:END_LOADING})
  } catch (error) {
    console.log(error);
  }
}
