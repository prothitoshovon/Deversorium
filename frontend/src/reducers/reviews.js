import { FETCH_ALL,UPDATE, CREATE,FETCH, FETCH_EMPTY_ROOMS, FETCH_ROOM_BY_ROOM_ID, BOOK,FETCH_REVIEWS_BY_HOSTEL,ERROR } from '../constants/actionTypes'

export default (state = { reviewsLoading: true, reviews: [] }, action) => {
    switch(action.type)
    {
        case 'START_LOADING':
            return { ...state, reviewsLoading: true }
        case 'END_LOADING':
            return { ...state, reviewsLoading: false }
        case FETCH_REVIEWS_BY_HOSTEL:
            return {...state, reviews:action.payload.reviews}
        case FETCH_ALL:
            return action.payload
        case CREATE:
            return { ...state, reviews: [...state.reviews, action.payload] };
        case FETCH:
            return { ...state, reviews: action.payload.review };
        case ERROR:
            return {...state, reviewsLoading:false,reviews: []}
        case UPDATE:
            return { ...state, reviews: state.reviews.map((review) => (review._id === action.payload._id ? action.payload : review)) }
        default: 
            return state
    }
}