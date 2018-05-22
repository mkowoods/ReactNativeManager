import {combineReducers} from 'redux';
import firebase from 'firebase';
import {
    EMAIL_CHANGED, 
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER_FETCH,
    EMPLOYEE_UPDATE,
    EMPLOYEE_CREATE,
    EMPLOYEES_FETCH_SUCCESS,
    EMPLOYEE_FORM_RESET,
    EMPLOYEE_DELETE_SHOW_CONFIRM,
    EMPLOYEE_DELETE_CLOSE_CONFIRM
} from '../actions/types'


const AUTH_REDUCER_INITIAL_STATE = {
    email: '',
    password: '',
    loading: false,
    error: '',
    user: null
}

function authReducer(state= AUTH_REDUCER_INITIAL_STATE, action){
   //console.log(action, state)
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


const EE_CREATE_INITIAL_STATE = {
    uid: '',
    name: '',
    phone: '',
    shift: 'monday'
}

function employee(state = EE_CREATE_INITIAL_STATE, action){
    switch(action.type){
        case EMPLOYEE_UPDATE: 
            return {...state, [action.payload.prop]: action.payload.value}
        case EMPLOYEE_FORM_RESET:
            return {...EE_CREATE_INITIAL_STATE}
        default:
            return state
        }
}

function employeeList(state = {}, action){
    switch(action.type){
        case EMPLOYEES_FETCH_SUCCESS:
//            console.log(JSON.stringify(action.payload))
            return action.payload
        default:
            return state;
    }
}

const EE_DELETE_INITIAL_STATE = {
    confirmationWindowVisible: false
}

function employeeDelete(state = EE_DELETE_INITIAL_STATE, action){
    console.log(action, state)
    switch(action.type){
        case EMPLOYEE_DELETE_SHOW_CONFIRM:
            return {...state, confirmationWindowVisible: true}
        case EMPLOYEE_DELETE_CLOSE_CONFIRM:
            return {...EE_DELETE_INITIAL_STATE}
        default:
            return state
    }
}


export default combineReducers({
    authReducer,
    employee,
    employeeList,
    employeeDelete
})