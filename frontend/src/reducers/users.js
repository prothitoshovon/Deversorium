import * as actionType from '../constants/actionTypes';

const userReducer = (state = { isLoading: true, users: [] }, action) => {

    switch (action.type) {
        case actionType.FETCH_USER:
            return { ...state, users: action.payload.data };
        case actionType.UPDATE:
            return { ...state, users: state.users.map((user) => (user._id === action.payload._id ? action.payload : user)) }
        default:
        return state
    }
}

export default userReducer;