import { combineReducers } from 'redux';

import posts from './posts';
import course from './course';
import auth from './auth';

export const reducers = combineReducers({ posts, auth, course});