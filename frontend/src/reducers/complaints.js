import { FETCH_ALL, CREATE,FETCH, FETCH_EMPTY_ROOMS, FETCH_ROOM_BY_ROOM_ID, BOOK } from '../constants/actionTypes'

export default (state = { isLoading: true, complaints: [] }, action) => {
    switch(action.type)
    {
        case 'START_LOADING':
            return { ...state, isLoading: true }
        case 'END_LOADING':
            return { ...state, isLoading: false }
        case FETCH_EMPTY_ROOMS:
            return {...state, complaints:action.payload.complaints}
        case FETCH_ALL:
            return action.payload
        case CREATE:
            return { ...state, complaints: [...state.complaints, action.payload] };
        case FETCH:
            return { ...state, complaints: action.payload.complaint };
        default: 
            return state
    }
}