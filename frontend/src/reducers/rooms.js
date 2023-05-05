import { FETCH_ALL, CREATE, FETCH_EMPTY_ROOMS, FETCH_ROOM_BY_ROOM_ID, BOOK, START_LOADING, END_LOADING,LEAVE,FETCH_ROOM_BY_HOSTEL_ID,ERROR } from '../constants/actionTypes'

export default (state = { roomsLoading: true, rooms: [] }, action) => {
    switch(action.type)
    {
        case START_LOADING:
            return { ...state, roomsLoading: true }
        case END_LOADING:
            return { ...state, roomsLoading: false }
        case FETCH_EMPTY_ROOMS:
            return {...state, rooms:action.payload.rooms}
        case FETCH_ROOM_BY_HOSTEL_ID:
            return {...state, rooms:action.payload.rooms}
        case FETCH_ALL:
            return action.payload
        case CREATE:
            return { ...state, rooms: [...state.rooms, action.payload] };
        case FETCH_ROOM_BY_ROOM_ID:
            return { ...state, rooms: action.payload.room };
        case BOOK:
            return { ...state, rooms: state.rooms.map((room) => (room._id === action.payload._id ? action.payload : room)) }
        case LEAVE:
            return { ...state, rooms: state.rooms.map((room) => (room._id === action.payload._id ? action.payload : room)) }
        case ERROR:
            return {...state, roomsLoading:false,rooms: []}
        default: 
            return state
    }
}