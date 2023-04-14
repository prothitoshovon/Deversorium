import { combineReducers } from 'redux';

import hostels from './hostels.js'
import auth from './auth.js'
import users from './users.js'

export const reducers = combineReducers({ auth,hostels,users });