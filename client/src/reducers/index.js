import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import tournament from './tournament'

export default combineReducers({
    alert,
    auth,
    profile,
    tournament
});