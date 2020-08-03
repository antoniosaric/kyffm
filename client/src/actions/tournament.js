import axios from 'axios';
import { setAlert } from './alert';

import {
    CREATE_TOURNAMENT_FAIL,
    CREATE_TOURNAMENT_SUCCESS,
    GET_TOURNAMENTS,
    TOURNAMENT_ERROR,
    CLEAR_TOURNAMENT,
    GET_TOURNAMENT,
    JOIN_TOURNAMENT_SUCCESS,
    JOIN_TOURNAMENT_FAIL
} from './types';


export const createTournament = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try{
        const response = await axios.post('/api/tournaments/solo', formData, config);

        dispatch({
            type: CREATE_TOURNAMENT_SUCCESS,
            payload: response.data
        });

        dispatch(setAlert('Tournament Created', 'success'));
    }catch (err){
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: CREATE_TOURNAMENT_FAIL
        });
    }
}

export const getTournaments = () => async dispatch => {
    
    try{
        const response = await axios.get('/api/tournaments');

        dispatch({
            type: GET_TOURNAMENTS,
            payload: response.data
        });
    }catch(err){
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: TOURNAMENT_ERROR
        });

    }
}

export const getTournamentById = tournamentId => async dispatch => {
    dispatch({ type: CLEAR_TOURNAMENT });
    try{
        const response = await axios.get(`/api/tournaments/solo/${tournamentId}`);

        dispatch({
            type: GET_TOURNAMENT,
            payload: response.data
        });
    }catch(err){
        dispatch({
            type: TOURNAMENT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
}


export const addUserToTournament =  ( tournamentId ) => async dispatch => {
    console.log('set')
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try{
        const response = await axios.put(`/api/tournaments/solo/join/${tournamentId}`, config);

        dispatch({
            type: JOIN_TOURNAMENT_SUCCESS,
            payload: response.data 
        });

        dispatch(setAlert('Joined Tournament', 'success'));
    }catch (err){
        dispatch({
            type: JOIN_TOURNAMENT_FAIL,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}
