import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Provider, d} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import firebase from 'firebase';
import reducers from './reducers'
import config from './firebase_config'
import LoginForm from './components/LoginForm'
import EmployeeList from './components/EmployeeList'
import EmployeeCreate from './components/EmployeeCreate'
import EmployeeEdit from './components/EmployeeEdit';

import AuthLoadingScreen from './components/AuthLoadingScreen'
import {createStackNavigator, createSwitchNavigator} from 'react-navigation'
import NavigationService from './NavigationService'
import {checkIflLoggedInWithFirebase} from './actions'


const store = createStore(
    reducers,
    applyMiddleware(thunk)
  );

//console.log(store.getState())
const AuthStack = createStackNavigator({
    login: {screen: LoginForm},
})

const AppStack = createStackNavigator({
    employeeList: {screen: EmployeeList},
    employeeEdit: {screen: EmployeeEdit},
    employeeCreate: {screen: EmployeeCreate}
}, {
    initialRouteName: 'employeeList'
})

const Router = createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
}, {
    initialRouteName: 'AuthLoading'
})

class App extends Component { 
    
    componentDidMount(){
        console.warn('App Mounted, Starting Config')
        const init = firebase.initializeApp(config)
        store.dispatch(checkIflLoggedInWithFirebase())
    }

    render(){
        return(
            <Provider store={store}>
                <Router ref={navigatorRef => {NavigationService.setTopLevelNavigator(navigatorRef)}} />
            </Provider>
        )
    }
}

export default App;