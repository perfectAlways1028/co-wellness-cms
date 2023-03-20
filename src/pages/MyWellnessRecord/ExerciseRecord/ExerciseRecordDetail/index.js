import React, { Component } from 'react';
import { CBreadcrumbs, CTabs, CSelectInput } from '../../../../components/atoms'

import { Strings } from '../../../../constants';

import ExerciseRecordForm from '../components/ExerciseRecordForm';
import { inject, observer } from "mobx-react";

class ExerciseRecordDetailPage extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
        };
    }
    componentDidMount() {
        const { employeeId, exerciseRecordId } = this.props.match.params; 
        this.props.employeeStore.findOneEmployee(employeeId)
    }

    getBreadCrumbs = (userName, employeeId, exerciseRecordId) => {
        return [
            {
                to: '/main/user-management',
                title: Strings.txtUserManagement
            },
            {
                to: `/main/user-management/detail/${employeeId}`,
                title: userName
            },
            {
                to: `/main/user-management/detail/${employeeId}/my-wellness-record/exercise/detail/${exerciseRecordId}`,
                title: Strings.txtExerciseRecordDetail
            },
        ]
    }

    onSelectTab = (index) => {

    }

    render() {

        const { employeeId, exerciseRecordId } = this.props.match.params; 
        if(!this.props.employeeStore.detailEmployee) return <div/>;
        const detailEmployee = this.props.employeeStore.detailEmployee;
        const userName = detailEmployee ? detailEmployee.user.name || "" : "";
     
        return <div className="cw-defaultpage-container"> 
            <CBreadcrumbs data={this.getBreadCrumbs(userName, employeeId, exerciseRecordId)}/>
            <div className="header">
                <div className="title">{Strings.txtExerciseRecordDetail}</div>
            </div>
            <div className="form-content-container">
                <ExerciseRecordForm  history={this.props.history} isEdit={true} employeeID={employeeId} exerciseRecordID={exerciseRecordId}/>
            </div>
          
        </div>
    }
}


export default inject('employeeStore')(observer(ExerciseRecordDetailPage));
