import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes'

export default (hostels = [], action) => {
    switch(action.type)
    {
        case FETCH_ALL:
            return action.payload
        case CREATE:
            return [...hostels,action.payload]
        default:
            return hostels
    }
}