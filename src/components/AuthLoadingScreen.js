import React, {Component } from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {connect} from 'react-redux'

class AuthLodingScreen extends Component {
    render(){
        return(
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={{padding: 20 }}>Logging In...</Text>
                <Text onPress={() => this.props.navigation.navigate('Auth')}>Cancel</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    horizontal: {
      flexDirection: 'column',
      padding: 1
    }
  })
export default AuthLodingScreen;
// export default connect(null, {checkIflLoggedInWithFirebase})(AuthLodingScreen);