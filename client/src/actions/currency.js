import axios from 'axios';
import { setAlert } from './alert';

export const addCurrency = ( competiors_array, tournamentId )  => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try{
        const response = await axios.put(`/api/result/solo/${tournamentId}`, competiors_array, config);

        dispatch(setAlert('Result updated', 'success'));
    }catch (err){
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

export const convertCurrencyToFront = ( number ) => {
    return number/100;
}

export const convertCurrencyToBack = ( number ) => {
    return number*100;
}


