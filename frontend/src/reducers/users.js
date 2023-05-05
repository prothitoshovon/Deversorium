import * as actionType from '../constants/actionTypes';

const userReducer = (state = { usersLoading: true, users: [] }, action) => {

    switch (action.type) {
        case actionType.START_LOADING:
            return { ...state, usersLoading: true }
        case actionType.END_LOADING:
            return { ...state, usersLoading: false }
        case actionType.FETCH_USER:
            return { ...state, users: action.payload.users };
        case actionType.UPDATE:
            return { ...state, users: state.users.map((user) => (user._id === action.payload._id ? action.payload : user)) }
        case actionType.ERROR:
            return {...state, usersLoading:false,users: []}
        default:
        return state
    }
}

export default userReducer;