import { FETCH_ALL, CREATE,DELETE, FETCH_EMPTY_ROOMS,FETCH_ROOM_REQUEST_BY_HOSTEL_ID } from '../constants/actionTypes'

export default (state = { isLoading: true, roomRequests: [] }, action) => {
    switch(action.type)
    {
        case 'START_LOADING':
            return { ...state, isLoading: true }
        case 'END_LOADING':
            return { ...state, isLoading: false }
        case FETCH_ROOM_REQUEST_BY_HOSTEL_ID:
            return { ...state, roomRequests: action.payload.roomRequests };
        case FETCH_ALL:
            return action.payload
        case CREATE:
            return { ...state, roomRequests: [...state.roomRequests, action.payload] };
        case DELETE:
            return { ...state, roomRequests: state.roomRequests.filter((room) => room._id !== action.payload) }
        default:
            return state
    }
}