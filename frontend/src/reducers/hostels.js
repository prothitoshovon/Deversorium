import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_HOSTEL, ERROR } from '../constants/actionTypes'

export default (state = { isLoading: true, hostels: [] }, action) => {
    switch(action.type)
    {
        case 'START_LOADING':
            return { ...state, isLoading: true }
        case 'END_LOADING':
            return { ...state, isLoading: false }
        case FETCH_ALL:
            return action.payload
        case CREATE:
            return { ...state, hostels: [...state.hostels, action.payload] };
        case FETCH_HOSTEL:
             return{ ...state, hostels: action.payload.hostel };
        case ERROR:
            return {...state, isLoading:false,hostels: null}
        default:
            return state
    }
}