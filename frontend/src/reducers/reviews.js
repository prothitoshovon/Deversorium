import { FETCH_ALL, CREATE,FETCH, FETCH_EMPTY_ROOMS, FETCH_ROOM_BY_ROOM_ID, BOOK,FETCH_REVIEWS_BY_HOSTEL,ERROR } from '../constants/actionTypes'

export default (state = { isLoading: true, reviews: [] }, action) => {
    switch(action.type)
    {
        case 'START_LOADING':
            return { ...state, isLoading: true }
        case 'END_LOADING':
            return { ...state, isLoading: false }
        case FETCH_REVIEWS_BY_HOSTEL:
            return {...state, reviews:action.payload.reviews}
        case FETCH_ALL:
            return action.payload
        case CREATE:
            return { ...state, reviews: [...state.reviews, action.payload] };
        case FETCH:
            return { ...state, reviews: action.payload.review };
        case ERROR:
            return {...state, isLoading:false,reviews: []}
        default: 
            return state
    }
}