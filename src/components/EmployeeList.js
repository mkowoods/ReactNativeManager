import React, {Component} from 'react'
import {View, Text} from 'react-native';
import {Button, ListView, ListItem} from 'react-native'
import {Card, CardSection, Input, Spinner} from './common'
import {connect} from 'react-redux'
import {employeesFetch} from '../actions'
import EmployeeListItem from './EmployeeListItem'

class EmployeeList extends Component {


    constructor(props){
        super(props)
        this.state = {}

        this.dataSource = this.createDataSource(this.props)
    }

    createDataSource(props){
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })
        return ds.cloneWithRows(props.employeeList)
    }


    static navigationOptions = ({ navigation }) =>  {
        return {
            title: 'Employees',
            headerRight: (<Button
                            title="Add"
                            onPress={() => navigation.navigate('employeeCreate')}
                        />)    
        }
      };



    componentWillReceiveProps(nextProps, nextState){
    //    console.log(nextProps)
        this.dataSource = this.createDataSource(nextProps)
    }

    componentDidMount(){
        this.props.employeesFetch();
    }

    renderRow(employee){
        return <EmployeeListItem employee={employee} />
    }

    render(){
        return (
            <ListView 
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
            />
        )
    
    }
}

function mapStateToProps(state){
    return {
        employeeList: Object.keys(state.employeeList).map((uid) => ({...state.employeeList[uid], uid}))
    }
}


export default connect(mapStateToProps, {employeesFetch})(EmployeeList)