import { START_LOADING, END_LOADING, CREATE, UPDATE,ERROR, DELETE ,FETCH_TENANT_BY_USER_ID,FETCH_TENANT_BY_HOSTEL_ID} from '../constants/actionTypes'

export default (state = { tenantsLoading: true, tenants: [] }, action) => {
    switch(action.type)
    {
        case START_LOADING:
            return { ...state, tenantsLoading: true }
        case END_LOADING:
            return { ...state, tenantsLoading: false }
        case UPDATE:
            return { ...state, tenants: state.tenants.map((tenant) => (tenant._id === action.payload._id ? action.payload : tenant)) }
        case FETCH_TENANT_BY_USER_ID:
            return { ...state, tenants: action.payload.tenant };
        case FETCH_TENANT_BY_HOSTEL_ID:
            return {...state, tenants: action.payload.tenants}
        case ERROR:
            return {...state, tenantsLoading:false,tenants: []}
        default:
            return state
    }
}
