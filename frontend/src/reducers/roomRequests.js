import { FETCH_ALL, CREATE,DELETE, FETCH_EMPTY_ROOMS,FETCH_ROOM_REQUEST_BY_HOSTEL_ID,ERROR } from '../constants/actionTypes'

export default (state = { roomRequestsLoading: true, roomRequests: [] }, action) => {
    switch(action.type)
    {
        case 'START_LOADING':
            return { ...state, roomRequestsLoading: true }
        case 'END_LOADING':
            return { ...state, roomRequestsLoading: false }
        case FETCH_ROOM_REQUEST_BY_HOSTEL_ID:
            return { ...state, roomRequests: action.payload.roomRequests };
        case FETCH_ALL:
            return action.payload
        case CREATE:
            return { ...state, roomRequests: [...state.roomRequests, action.payload] };
        case DELETE:
            return { ...state, roomRequests: state.roomRequests.filter((room) => room._id !== action.payload) }
        case ERROR:
            return {...state, roomRequestsLoading:false,roomRequests: []}
        default:
            return state
    }
}