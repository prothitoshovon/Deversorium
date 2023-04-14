import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes'

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
            return { ...state, posts: [...state.posts, action.payload] };
        default:
            return state
    }
}