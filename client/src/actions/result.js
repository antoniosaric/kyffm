import axios from 'axios';
import { setAlert } from './alert';

import {
    RESULT_SUCCESS,
    RESULT_ERROR
} from './types';

export const addResultSolo = ( competiors_array, tournamentId )  => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try{
        await axios.put(`/api/result/solo/${tournamentId}`, competiors_array, config);
        dispatch(setAlert('Result updated', 'success'));
    }catch (err){
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

    }
}

