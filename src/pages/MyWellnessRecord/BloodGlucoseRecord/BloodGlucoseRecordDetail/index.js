import React, { Component } from 'react';
import { CBreadcrumbs, CTabs, CSelectInput } from '../../../../components/atoms'

import { Strings } from '../../../../constants';

import BloodGlucoseRecordForm from '../components/BloodGlucoseRecordForm';
import { inject, observer } from "mobx-react";

class BloodGlucoseRecordDetailPage extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
        };
    }
    componentDidMount() {
        const { employeeId, bloodGlucoseRecordId } = this.props.match.params; 
        this.props.employeeStore.findOneEmployee(employeeId)
    }

    getBreadCrumbs = (userName, employeeId, bloodGlucoseRecordId) => {
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
                to: `/main/user-management/detail/${employeeId}/my-wellness-record/bloodGlucose/detail/${bloodGlucoseRecordId}`,
                title: Strings.txtBloodGlucoseRecordDetail
            },
        ]
    }

    onSelectTab = (index) => {

    }

    render() {

        const { employeeId, bloodGlucoseRecordId } = this.props.match.params; 
        if(!this.props.employeeStore.detailEmployee) return <div/>;
        const detailEmployee = this.props.employeeStore.detailEmployee;
        const userName = detailEmployee ? detailEmployee.user.name || "" : "";
     
        return <div className="cw-defaultpage-container"> 
            <CBreadcrumbs data={this.getBreadCrumbs(userName, employeeId, bloodGlucoseRecordId)}/>
            <div className="header">
                <div className="title">{Strings.txtBloodGlucoseRecordDetail}</div>
            </div>
            <div className="form-content-container">
                <BloodGlucoseRecordForm  history={this.props.history} isEdit={true} employeeID={employeeId} bloodGlucoseRecordID={bloodGlucoseRecordId}/>
            </div>
          
        </div>
    }
}


export default inject('employeeStore')(observer(BloodGlucoseRecordDetailPage));
