import React from 'react'
import ReactNative from 'react-native'
import {Text, View} from 'react-native'
//import isIphoneX from './isIphoneX'
import { Dimensions, Platform } from 'react-native';
//https://aaronpresley.com/determine-if-on-iphone-x-in-react-native/

const isIphoneX = () => {
  let d = Dimensions.get('window');
  const { height, width } = d;

  return (
    // This has to be iOS duh
    Platform.OS === 'ios' &&

    // Accounting for the height in either orientation
    (height === 812 || width === 812)
  );
}
const isX = isIphoneX()
const _height = (isX ? 80 : 60)
const _paddingTop = (isX ? 35 : 15)




const styles = {
    textStyle: {
        fontSize: 20,
    },
    viewStyle: {
        backgroundColor: "#F8F8F8",
        justifyContent: 'center',
        alignItems: 'center',
        height: _height,
        paddingTop: _paddingTop,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative'

    }
}


const Header = (props) => {
    const { textStyle, viewStyle } = styles;
    
    return (
        <View style={viewStyle}>
            <Text style={textStyle}>{props.headerText}</Text>
        </View>
    )
}


export { Header };