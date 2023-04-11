import { combineReducers } from 'redux';

import hostels from './hostels.js'
import auth from './auth.js'

export const reducers = combineReducers({ auth,hostels });