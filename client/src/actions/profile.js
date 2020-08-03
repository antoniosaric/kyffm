import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_PROFILE,
    PROFILE_ERROR,
    GET_PROFILES,
    CLEAR_PROFILE
} from './types';

//Get current users profile

export const getCurrentProfile = () => async dispatch => {

    try{
        const response = await axios.get('/api/profiles/profile/edit');

        dispatch({
            type: GET_PROFILE,
            payload: response.data
        });
    }catch(err){
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
}

export const getProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    try{
        const response = await axios.get('/api/profiles');

        dispatch({
            type: GET_PROFILES,
            payload: response.data
        });
    }catch(err){
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
}

export const getProfileById = userId => async dispatch => {

    try{
        const response = await axios.get(`/api/profiles/profile/${userId}`);

        dispatch({
            type: GET_PROFILE,
            payload: response.data
        });
    }catch(err){
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
}

export const updateProfile = ( formData, history, edit = true ) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const response = await axios.post('/api/profiles/profile/edit', formData, config );

        dispatch({
            type: GET_PROFILE,
            payload: response.data
        });

        dispatch( setAlert('Profile Updated') );

    } catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}