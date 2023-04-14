import * as actionType from '../constants/actionTypes';

const userReducer = (state = { isLoading: true, users: [] }, action) => {

    switch (action.type) {
        case actionType.FETCH_USER:
            return { ...state, users: action.payload.data };
        default:
        return state
    }
}

export default userReducer;