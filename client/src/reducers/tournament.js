import {
    CREATE_TOURNAMENT_FAIL,
    CREATE_TOURNAMENT_SUCCESS,
    GET_TOURNAMENTS,
    GET_TOURNAMENT,
    CLEAR_TOURNAMENT,
    JOIN_TOURNAMENT_SUCCESS,
    JOIN_TOURNAMENT_FAIL
} from '../actions/types';

const initialState = {
    tournaments: [],
    tournament: null,
    loading: true,
    error: {}
}

export default function( state = initialState, action){
    const { type, payload } = action;

    switch (type) {
        case CREATE_TOURNAMENT_SUCCESS:
        case GET_TOURNAMENT:
            return {
                ...state,
                tournament: payload,
                loading: false
            };
        case GET_TOURNAMENTS:
            return {
                ...state,
                tournaments: payload,
                loading: false
            }
        case CLEAR_TOURNAMENT:
            return {
                ...state,
                tournament: null,
                loading: false
            }    
        case JOIN_TOURNAMENT_SUCCESS:
            return {
                ...state,
                tournament: payload,
                loading: false     
            }   
        case JOIN_TOURNAMENT_FAIL: 
        return {
            ...state,
            loading:false
        }    
        case CREATE_TOURNAMENT_FAIL:
            return {
                ...state,
                tournament: payload,
                loading: false
            };
        default: 
            return state;    
    }
}