import React, {Component} from 'react'
import {View} from 'react-native';
import {Card, CardSection, Button} from './common';
import {connect} from 'react-redux'
import {employeeUpdate, employeeCreate, employeeFormReset} from '../actions'
import EmployeeForm from './EmployeeForm';

class EmployeeCreate extends Component {

    constructor(props){
        super(props)
        this.onButtonPress = this.onButtonPress.bind(this);
        props.employeeFormReset() //Update props form employee state object to clear form
    }

    static navigationOptions = ({ navigation }) =>  {
        return {
            title: 'Create Employee',
        }
    };

    onButtonPress(){
        this.props.employeeCreate();
    }

    render(){
        return(
            <Card>
                <EmployeeForm {...this.props}/>
                <CardSection>
                    <Button onPress={this.onButtonPress}>Create</Button>
                </CardSection>
            </Card>

        )
    }

}


const mapStateToProps = (state) => {
    return {
        name: state.employee.name,
        phone: state.employee.phone,
        shift: state.employee.shift
    }
}

export default connect(mapStateToProps, {employeeUpdate, employeeCreate, employeeFormReset})(EmployeeCreate);