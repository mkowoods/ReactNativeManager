import {combineReducers} from 'redux';
import {
    EMAIL_CHANGED, 
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER_FETCH
} from '../actions/types'


const AUTH_REDUCER_INITIAL_STATE = {
    email: '',
    password: '',
    loading: false,
    error: '',
    user: null
}

function authReducer(state= AUTH_REDUCER_INITIAL_STATE, action){
   console.log(action, state)
    switch(action.type){
        case EMAIL_CHANGED:
            return {...state, email: action.payload}
        case PASSWORD_CHANGED:
            return {...state, password: action.payload}
        case LOGIN_USER_SUCCESS:
            return {...state, ...AUTH_REDUCER_INITIAL_STATE, user: action.payload}
        case LOGIN_USER_FAIL:
            return {...state, error: 'Login Failed!!', password: '', loading: false}
        case LOGIN_USER_FETCH:
            return {...state, error: '', loading: true}
        default:
            return state;
    }
};

function isAuthenticated(state = false, action){
    return state
}

export default combineReducers({
    authReducer
})