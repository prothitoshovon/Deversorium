import { combineReducers } from 'redux';

import hostels from './hostels.js'
import auth from './auth.js'
import users from './users.js'
import rooms from './rooms.js'
import roomRequests from './roomRequests.js'
import tenants from './tenants.js'
export const reducers = combineReducers({ auth,hostels,users,rooms,roomRequests,tenants });