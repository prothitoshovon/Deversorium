import { START_LOADING, END_LOADING, CREATE, UPDATE, DELETE } from '../constants/actionTypes'

export default (state = { isLoading: true, tenants: [] }, action) => {
    switch(action.type)
    {
        case START_LOADING:
            return { ...state, isLoading: true }
        case END_LOADING:
            return { ...state, isLoading: false }
        case UPDATE:
            return { ...state, tenants: state.tenants.map((tenant) => (tenant._id === action.payload._id ? action.payload : tenant)) }

        default:
            return state
    }
}