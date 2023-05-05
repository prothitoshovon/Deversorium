import * as actionType from '../constants/actionTypes';

const userReducer = (state = { isLoading: true, users: [] }, action) => {

    switch (action.type) {
        case actionType.START_LOADING:
            return { ...state, isLoading: true }
        case actionType.END_LOADING:
            return { ...state, isLoading: false }
        case actionType.FETCH_USER:
            return { ...state, users: action.payload.users };
        case actionType.UPDATE:
            return { ...state, users: state.users.map((user) => (user._id === action.payload._id ? action.payload : user)) }
        case actionType.ERROR:
            return {...state, isLoading:false,users: []}
        default:
        return state
    }
}

export default userReducer;