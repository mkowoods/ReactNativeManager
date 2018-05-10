import firebase from 'firebase';
import NavigationService from '../NavigationService';

import {
    EMAIL_CHANGED, 
    PASSWORD_CHANGED, 
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER_FETCH
} from './types'


export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    }
}

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    }
}

const loginUserSuccess = (dispatch, user) => {
    dispatch({ type: LOGIN_USER_SUCCESS, payload: user })
    NavigationService.navigate('employeeList')
}

const loginUserFail = (dispatch) => {
    dispatch({type: LOGIN_USER_FAIL})
}

const loginUserFetch = (dispatch) => {
    dispatch({type: LOGIN_USER_FETCH})
}

export const logoutUser = () => {
    return (dispatch, getState) => {
        loginUserFetch(dispatch)
        firebase.auth().signOut()
            .then(() => {
                loginUserSuccess(dispatch, null);
            })
            .catch((err) => {
                loginUserFail(dispatch)
            })
    }
}

// test@test.com   test1234
export const loginUser = () => {
    return (dispatch, getState) => {
        const {authReducer} = getState();
        const {email, password} = authReducer;
        loginUserFetch(dispatch);
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => loginUserSuccess(dispatch, user))
            .catch((error) => {
                console.log(error)
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(user => loginUserSuccess(dispatch, user))
                    .catch((error) => {
                        console.log(error);
                        loginUserFail(dispatch)
                    })
            })
    }
}