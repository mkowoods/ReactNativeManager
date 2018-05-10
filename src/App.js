import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import firebase from 'firebase';
import reducers from './reducers'
import config from './firebase_config'
import LoginForm from './components/LoginForm'
import EmployeeList from './components/EmployeeList'
import {createStackNavigator} from 'react-navigation'
import NavigationService from './NavigationService'

const store = createStore(
    reducers,
    applyMiddleware(thunk)
  );

console.log(store.getState())
const Router = createStackNavigator({
    login: {screen: LoginForm},
    employeeList: {screen: EmployeeList}
}, {
    initialRouteName: 'login'
})

class App extends Component { 
    
    componentDidMount(){
        firebase.initializeApp(config);
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