import axios from 'axios';
import { setAlert } from './alert';

export const enterPayment = formData => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try{
        const response = await axios.post('/api/payments', formData, config);
        
        dispatch(setAlert('Funds Added To Account', 'success'));
    }catch (err){
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

    }
}

export const getPayments = () => async dispatch => {

    try{
        const response = await axios.get('/api/payments');

    }catch(err){
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}