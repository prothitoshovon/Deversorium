import { FETCH_ALL,ERROR, CREATE,FETCH, FETCH_EMPTY_ROOMS, FETCH_ROOM_BY_ROOM_ID, BOOK, FETCH_COMPLAINTS_BY_HOSTEL_ID, DELETE } from '../constants/actionTypes'

export default (state = { complaintsLoading: true, complaints: [] }, action) => {
    switch(action.type)
    {
        case 'START_LOADING':
            return { ...state, complaintsLoading: true }
        case 'END_LOADING':
            return { ...state, complaintsLoading: false }
        case FETCH_EMPTY_ROOMS:
            return {...state, complaints:action.payload.complaints}
        case FETCH_ALL:
            return action.payload
        case CREATE:
            return { ...state, complaints: [...state.complaints, action.payload] };
        case FETCH:
            return { ...state, complaints: action.payload.complaint };
        case FETCH_COMPLAINTS_BY_HOSTEL_ID:
            return {...state, complaints:action.payload.complaints};
        case DELETE:
            return { ...state, complaints: state.complaints.filter((complaint) => complaint._id !== action.payload) }
        case ERROR:
            return {...state, complaintsLoading:false,complaints: []}
        default: 
            return state
    }
}