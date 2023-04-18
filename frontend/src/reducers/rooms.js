import { FETCH_ALL, CREATE, FETCH_EMPTY_ROOMS } from '../constants/actionTypes'

export default (state = { isLoading: true, rooms: [] }, action) => {
    switch(action.type)
    {
        case 'START_LOADING':
            return { ...state, isLoading: true }
        case 'END_LOADING':
            return { ...state, isLoading: false }
        case FETCH_EMPTY_ROOMS:
            return {...state, rooms:action.payload.rooms}
        case FETCH_ALL:
            return action.payload
        case CREATE:
            return { ...state, rooms: [...state.rooms, action.payload] };

        default:
            return state
    }
}