import React, {Component} from 'react'
import {View, Text} from 'react-native';
import {Card, CardSection, Input, Button, Spinner} from './common'
import AuthLoadingScreen from './AuthLoadingScreen';
import {connect} from 'react-redux'
import {emailChanged, passwordChanged, loginUser, logoutUser} from '../actions'

class LoginForm extends Component {

    constructor(props){
        super(props)
        this.onEmailChanged = this.onEmailChanged.bind(this);
        this.onPasswordChanged = this.onPasswordChanged.bind(this);
        this.onLoginButtonPress = this.onLoginButtonPress.bind(this);
        this.onLogoutButtonPress = this.onLogoutButtonPress.bind(this);
    }


    static navigationOptions = {
        title: 'Login',
      };

    onEmailChanged(text){
        // console.log(this.props.email)
        this.props.emailChanged(text);
    }

    onPasswordChanged(text){
        this.props.passwordChanged(text)
    }

    onLoginButtonPress(){
        this.props.loginUser();
    }

    onLogoutButtonPress(){
        this.props.logoutUser();
    }

    renderError(){
        if(this.props.error){
            return (
                <View style={{backgroundColor: 'white'}}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            )
        }
    }

    renderButton(){
        if(this.props.loading){
            return <Spinner size="large" />
        }
        if(this.props.user){
            return <Button onPress={this.onLogoutButtonPress}>Logout</Button>
        }
        return <Button onPress={this.onLoginButtonPress}>Login</Button>
    }

    render(){
        console.log(this.props)
        return (
            <Card>
                <CardSection>
                    <Input 
                        label="Email"
                        placeholder="email@gmail.com"
                        onChangeText={this.onEmailChanged}
                        value={this.props.email} //this doesnt seem to work
                    />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry
                        label="Password"
                        placeholder="password"
                        onChangeText={this.onPasswordChanged}
                        value={this.props.password}
                    />
                </CardSection>
                {this.renderError()}
                <CardSection>
                    {this.renderButton()}
                    <Button onPress={() => this.props.navigation.navigate('employeeList')}>EE List</Button>
                </CardSection>
            </Card>
        )
    }
}


const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}

const mapStateToProps = (state) => {
    return {
        email: state.authReducer.email,
        password: state.authReducer.password,
        error: state.authReducer.error,
        loading: state.authReducer.loading,
        user: state.authReducer.user
    }
}
 
export default connect(mapStateToProps, {emailChanged, passwordChanged, loginUser, logoutUser})(LoginForm);