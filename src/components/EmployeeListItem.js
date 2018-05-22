import React, {Component} from 'react'
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import {CardSection, Card} from '../components/common'
import NavigationService from '../NavigationService'

class EmployeeListItem extends Component {

    constructor(props){
        super(props)
        this.onRowPress = this.onRowPress.bind(this)
//        console.log(props)
    }

    onRowPress(){
        console.log("Clicked Nav EE")
        NavigationService.navigate('employeeEdit', {employee: this.props.employee})
    }

    render(){
        return(
            <TouchableWithoutFeedback onPress={this.onRowPress}>
                <View>
                    <CardSection>
                        <Text style={styles.titleStyle}>
                            {this.props.employee.name}
                        </Text>
                    </CardSection>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    }
}

export default EmployeeListItem;