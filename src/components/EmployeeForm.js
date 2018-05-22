import React, {Component} from 'react'
import {View, Text, Picker} from 'react-native'
import {Card, CardSection, Input} from './common'


class EmployeeForm extends Component {

    render(){
        return(
        <View>
            <CardSection>
                <Input 
                    label="Name" 
                    placeholder="Jane Doe"
                    onChangeText={(text) => this.props.employeeUpdate({prop: 'name', value: text})}
                    value={this.props.name}
                /> 
            </CardSection>
            <CardSection>
                <Input 
                    label="Phone" 
                    placeholder="555-555-1234"
                    onChangeText={(text) => this.props.employeeUpdate({prop: 'phone', value: text})}
                    value={this.props.phone}    
                /> 
            </CardSection>
            <CardSection style={{flexDirection: 'column'}}>
                <Text style={styles.pickerTextStye}>Shift</Text>
                <Picker 
                    selectedValue={this.props.shift || 'monday'}
                    onValueChange={shift => this.props.employeeUpdate({prop: 'shift', value: shift})}
                    // style={{flex: 1 }}
                >
                <Picker.Item label="Monday" value="monday" />
                <Picker.Item label="Tuesday" value="tuesday" />
                <Picker.Item label="Wednesday" value="wednesday" />
                <Picker.Item label="Thursday" value="thursday" />
                <Picker.Item label="Friday" value="friday" />
                <Picker.Item label="Saturday" value="saturday" />
                <Picker.Item label="Sunday" value="sunday" />
                </Picker>
            </CardSection>
        </View>

        )
    }

}


const styles = {
    pickerTextStye: {
        fontSize: 18,
        paddingLeft: 20
    }
}


export default EmployeeForm;