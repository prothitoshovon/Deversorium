import { START_LOADING, END_LOADING, CREATE, UPDATE, DELETE ,FETCH_TENANT_BY_USER_ID,FETCH_TENANT_BY_HOSTEL_ID} from '../constants/actionTypes'

export default (state = { isLoading: true, tenants: [] }, action) => {
    switch(action.type)
    {
        case START_LOADING:
            return { ...state, isLoading: true }
        case END_LOADING:
            return { ...state, isLoading: false }
        case UPDATE:
            return { ...state, tenants: state.tenants.map((tenant) => (tenant._id === action.payload._id ? action.payload : tenant)) }
        case FETCH_TENANT_BY_USER_ID:
            return { ...state, tenants: action.payload.tenant };
        case FETCH_TENANT_BY_HOSTEL_ID:
            return {...state, tenants: action.payload.tenants}
        default:
            return state
    }
}
