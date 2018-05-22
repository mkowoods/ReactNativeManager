import firebase from 'firebase';
import NavigationService from '../NavigationService';

import {
    EMAIL_CHANGED, 
    PASSWORD_CHANGED, 
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER_FETCH,
    EMPLOYEE_UPDATE,
    // EMPLOYEE_CREATE,
    EMPLOYEES_FETCH_SUCCESS,
    EMPLOYEE_FORM_RESET,
    EMPLOYEE_DELETE_SHOW_CONFIRM,
    EMPLOYEE_DELETE_CLOSE_CONFIRM
} from './types'


/** LoginForm Actions **/

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
    NavigationService.navigate('App')
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


export const checkIflLoggedInWithFirebase = () => {
    console.warn('checkIflLoggedInWithFirebase')
    return (dispatch, getState) => {
        console.log(getState().authReducer)
        if(getState().authReducer.user !== null){
            NavigationService.navigate('App')
        }
        
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                loginUserSuccess(dispatch, user)
            } else {
               NavigationService.navigate('Auth')
                dispatch({type: 'NOT_LOGGED_IN'})
            }
    
        })
    }
}

/** EmployeeCreate Actions **/

export const employeeUpdate = ({prop, value}) => {
    return {
        type: EMPLOYEE_UPDATE,
        payload: {prop, value}
    }
}

export const employeeCreate = () => {
    return  (dispatch, getState) => {
        const state = getState();
        const currentUser = state.authReducer.user;
        const {name, phone, shift} = state.employee;

        firebase.database().ref(`/users/${currentUser.uid}/employees`)
            .push({name, phone, shift})
            .then((() => {
                NavigationService.navigate('employeeList')
                dispatch({type: EMPLOYEE_FORM_RESET})
            }))
    }
}

export const employeeSave = () => {
    return (dispatch, getState) => {
        const state = getState();
        const currentUser = state.authReducer.user;
        const {uid, name, phone, shift} = state.employee;
        firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
            .set({name, phone, shift})
            .then(() => {
                NavigationService.navigate('employeeList');
                dispatch({type: EMPLOYEE_FORM_RESET})
            })
        
    }
}


export const employeeFormReset = () => {
    return {
        type: EMPLOYEE_FORM_RESET
    }
}

/** EmployeeList actions */

export const employeesFetch = () => {
    const {currentUser} = firebase.auth(); //TODO: should probably use getState from redux for this instead of fetching directly

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees`)
            .on('value', snapshot => {
                dispatch({type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val()})                
            })
    }
}



/** EE Delete Workflow */

export const showConfirmationWindow = () => {
    return {
        type: EMPLOYEE_DELETE_SHOW_CONFIRM
    }
}

export const employeeDeleteConfirm = () => {
    //do some firebase stuff
    return (dispatch, getState) => {
        const state = getState();
        const currentUser = state.authReducer.user;
        const {uid, name, phone, shift} = state.employee;
        firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
            .remove()
            .then(() => {
                NavigationService.navigate('employeeList');
                dispatch({type: EMPLOYEE_DELETE_CLOSE_CONFIRM})
            })
    }
}

export const employeeDeleteCancel = () => {
    return {
        type: EMPLOYEE_DELETE_CLOSE_CONFIRM
    }
}