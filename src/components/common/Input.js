import React, {Component} from 'react';
import {TextInput, View, Text} from 'react-native'

const styles = {
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    inputStyle: {
//        height: 20,
        width: 100,
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
}


const Input = ({label, onChangeText, value, placeholder, secureTextEntry}) => {
    return(
        <View style={styles.containerStyle}>
            <Text style={styles.labelStyle}>{label}</Text>
            <TextInput 
                placeholder={placeholder}
                autoCorrect={false}
                secureTextEntry={secureTextEntry}
                autoCapitalize="none"
                onChangeText={onChangeText}
                value={value}
                style={styles.inputStyle}
            />

        </View>

    );
}

export { Input };