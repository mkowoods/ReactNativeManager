import React, {Component} from 'react'
import {View, Text} from 'react-native';
import {Card, CardSection, Button, ConfirmModal} from './common'
import {connect} from 'react-redux'
import Communications from 'react-native-communications'
import {
    employeeUpdate, 
    employeeSave,
    showConfirmationWindow,
    employeeDeleteConfirm,
    employeeDeleteCancel
} from '../actions'
import EmployeeForm from './EmployeeForm'


class EmployeeEdit extends Component {

    constructor(props){
        super(props)
        
        this.onSaveButtonPress = this.onSaveButtonPress.bind(this);
        this.onTextPress = this.onTextPress.bind(this);
        this.onDeleteButtonPress = this.onDeleteButtonPress.bind(this);


        const eeProps = this.props.navigation.getParam('employee')
        Object.keys(eeProps).forEach(k => {
            this.props.employeeUpdate({prop: k, value: eeProps[k]})
        })

    }

    static navigationOptions = ({ navigation }) =>  {
        return {
            title: 'Edit Employee',
        }
    };

    onSaveButtonPress(){
        this.props.employeeSave();
    }

    onDeleteButtonPress(){
//        console.log(this.props)
        this.props.showConfirmationWindow()
    }

    onTextPress(){
//        console.log(this.props)
        const {phone, shift} = this.props;
        Communications.text(phone, `Your Upcoming Shift: ${shift}`)
    }

    render(){
        console.log(this.props)
        return(

            <Card>
                <EmployeeForm {...this.props}/>
                <CardSection>
                    <Button onPress={this.onSaveButtonPress}>Save Changes</Button>
                </CardSection>
                <CardSection>
                    <Button onPress={this.onTextPress}>Text Schedule</Button>
                </CardSection>
                <CardSection>
                    <Button onPress={this.onDeleteButtonPress}>Delete</Button>
                </CardSection>
                <ConfirmModal 
                    visible={this.props.confirmationWindowVisible}
                    onYesClick={this.props.employeeDeleteConfirm}
                    onNoClick={this.props.employeeDeleteCancel}
                    text={"Are you sure you want to delete this Employee?"}
                />
            </Card>

        )
    }

}


const mapStateToProps = (state) => {
    return {
        name: state.employee.name,
        phone: state.employee.phone,
        shift: state.employee.shift,
        confirmationWindowVisible: state.employeeDelete.confirmationWindowVisible,

    }
}

export default connect(mapStateToProps, {
    employeeUpdate, 
    employeeSave,
    showConfirmationWindow,
    employeeDeleteConfirm,
    employeeDeleteCancel
})(EmployeeEdit);